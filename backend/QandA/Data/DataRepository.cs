using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using QandA.Data.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using System.Data;
using Dapper;

namespace QandA.Data
{
    public class DataRepository : IDataRepository
    {
        private readonly string _connectionString;

        public DataRepository(IConfiguration configuration)
        {
            _connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }

        public AnswerGetResponse GetAnswer(int answerId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.QueryFirstOrDefault<AnswerGetResponse>(
                @"EXEC dbo.Answer_Get_ByAnswerId @AnswerId = @AnswerId",
                new { AnswerId = answerId }
                );
            }
        }

        public QuestionGetSingleResponse GetQuestion(int questionId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var question =
                connection.QueryFirstOrDefault<QuestionGetSingleResponse>(
                @"EXEC dbo.Question_GetSingle @QuestionId = @QuestionId",
                new { QuestionId = questionId }
                );
                // TODO - Get the answers for the question
                if (question != null)
                {
                    question.Answers =
                    connection.Query<AnswerGetResponse>(
                    @"EXEC dbo.Answer_Get_ByQuestionId
                                @QuestionId = @QuestionId",
                    new { QuestionId = questionId }
                    );
                }
                return question;
            }

        }

        public IEnumerable<QuestionGetManyResponse> GetQuestions()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.Query<QuestionGetManyResponse>(
                @"EXEC dbo.Question_GetMany"
                );
            }
        }

        public IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch(string search)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                // TODO - execute Question_GetMany_BySearch stored procedure
                return connection.Query<QuestionGetManyResponse>(
                @"EXEC dbo.Question_GetMany_BySearch @Search = @Search",
                new { Search = search }
                );
            }
        }

        public IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.Query<QuestionGetManyResponse>(
                "EXEC dbo.Question_GetUnanswered"
                );
            }
        }

        public bool QuestionExists(int questionId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.QueryFirst<bool>(
                @"EXEC dbo.Question_Exists @QuestionId = @QuestionId",
                new { QuestionId = questionId }
                );
            }

        }
        public QuestionGetSingleResponse PostQuestion(QuestionPostRequest question)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var questionId = connection.QueryFirst<int>(
                    @"EXEC dbo.Question_Post
                    @Title = @Title, @Content = @Content,
                    @UserId = @UserId, @UserName = @UserName,
                    @Created = @Created", question
                );
                return GetQuestion(questionId);
            }

        }
        public QuestionGetSingleResponse PutQuestion(int questionId, QuestionPutRequest question)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                connection.Execute(
                    @"EXEC dbo.Question_Put
                    @QuestionId = @QuestionId, @Title = @Title, @Content = @Content",
                new { QuestionId = questionId, question.Title, question.Content }
                );
                return GetQuestion(questionId);
            }

        }
        public void DeleteQuestion(int questionId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                connection.Execute(
                    @"EXEC dbo.Question_Delete
                    @QuestionId = @QuestionId",
                new { QuestionId = questionId }
                );
            }
        }

        public AnswerGetResponse PostAnswer(AnswerPostRequest answer)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.QueryFirst<AnswerGetResponse>(
                @"EXEC dbo.Answer_Post
                    @QuestionId = @QuestionId, @Content = @Content,
                    @UserId = @UserId, @UserName = @UserName,
                    @Created = @Created",
                answer
                );
            }
        }

    }
}
