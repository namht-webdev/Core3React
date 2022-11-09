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
            string queryString = @"EXEC dbo.Question_GetSingle @QuestionId";
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(
                    queryString, connection);
                command.Parameters.Add("@QuestionId", SqlDbType.Text);
                command.Parameters["@QuestionId"].Value = answerId;
                using (SqlDataReader readers = command.ExecuteReader())
                {
                    return (AnswerGetResponse)readers[0];
                }

            }
        }

        public QuestionGetSingleResponse GetQuestion(int questionId)
        {
            string queryString = @"EXEC dbo.Question_GetSingle @QuestionId";
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(
                    queryString, connection);

                command.Parameters.Add("@QuestionId", SqlDbType.Text);
                command.Parameters["@QuestionId"].Value = questionId;

                using (SqlDataReader readers = command.ExecuteReader())
                {
                    var question = (QuestionGetSingleResponse)readers[0];
                    if (question != null)
                    {
                        SqlCommand command2 = new SqlCommand(
                        queryString, connection);
                        command2.Parameters.Add("@QuestionId", SqlDbType.Text);
                        command2.Parameters["@QuestionId"].Value = questionId;
                        using (SqlDataReader readers2 = command2.ExecuteReader())
                        {
                            foreach (AnswerGetResponse reader in readers2)
                            {
                                question.Answers.Append(reader);
                            }
                        }
                    }

                    return question;
                }

            }
        }

        public IEnumerable<QuestionGetManyResponse> GetQuestions()
        {
            QuestionGetManyResponse ques
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string queryString = @"EXEC dbo.Question_GetMany";
                using (SqlCommand command = new SqlCommand(
                    queryString, connection))
                {
                    using (SqlDataReader readers = command.ExecuteReader())
                    {
                        foreach (QuestionGetManyResponse reader in readers)
                        {
                            yield return reader;
                        }
                    }
                }
                
            }
        }

        public IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch(string search)
        {
            string queryString = @"EXEC dbo.Question_GetMany_BySearch @Search";
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(
                    queryString, connection);
                command.Parameters.Add("@Search", SqlDbType.Text);
                command.Parameters["@Search"].Value = search;
                using (SqlDataReader readers = command.ExecuteReader())
                {
                    foreach (QuestionGetManyResponse reader in readers)
                    {
                        yield return reader;
                    }
                }
            }
        }

        public IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions()
        {
            string queryString = @"EXEC dbo.Question_GetUnanswered";
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(
                    queryString, connection);
                using (SqlDataReader readers = command.ExecuteReader())
                {
                    foreach (QuestionGetManyResponse reader in readers)
                    {
                        yield return reader;
                    }
                }
            }
        }

        public bool QuestionExists(int questionId)
        {
            string queryString = @"EXEC dbo.Question_GetUnanswered";
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(
                    queryString, connection);
                using (SqlDataReader readers = command.ExecuteReader())
                {
                    var question = (QuestionGetSingleResponse)readers[0];
                    return question != null ? true : false;

                }
            }
        }
        public QuestionGetSingleResponse PostQuestion(QuestionPostRequest question)
        {
            string queryString = @"EXEC dbo.Question_Post
                                        @Title, @Content, @UserId, @UserName, @Created";
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(
                    queryString, connection);
                command.Parameters.AddWithValue("@Title", question.Title ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@Content", question.Content ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@UserId", question.UserId ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@UserName", question.UserName ?? (object)DBNull.Value);
                command.Parameters.Add("@Created", SqlDbType.DateTime);
                command.Parameters["@Created"].Value = question.Created;

                using (SqlDataReader readers = command.ExecuteReader())
                {
                    int questionId = (int)readers[0];
                    return GetQuestion(questionId);
                }

            }
        }
        public QuestionGetSingleResponse PutQuestion(int questionId, QuestionPutRequest question)
        {
            string queryString = @"EXEC dbo.Question_Put
                    @QuestionId, @Title, @Content";
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(
                    queryString, connection);
                command.Parameters.Add("@QuestionId", SqlDbType.Int);
                command.Parameters["@QuestionId"].Value = questionId;
                command.Parameters.AddWithValue("@Title", question.Title ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@Content", question.Content ?? (object)DBNull.Value);
                command.ExecuteReader();
                return GetQuestion(questionId);
            }
        }
        public void DeleteQuestion(int questionId)
        {
            string queryString = @"EXEC dbo.Question_Delete @QuestionId";
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(
                    queryString, connection);
                command.Parameters.Add("@QuestionId", SqlDbType.Int);
                command.Parameters["@QuestionId"].Value = questionId;
                command.ExecuteReader();
            }
        }

        public AnswerGetResponse PostAnswer(AnswerPostRequest answer)
        {
            string queryString = @"EXEC dbo.Answer_Post @QuestionId, @Content, @UserId, @UserName, @Created";
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(
                    queryString, connection);
                command.Parameters.Add("@QuestionId", SqlDbType.Int);
                command.Parameters["@QuestionId"].Value = answer.QuestionId;
                command.Parameters.AddWithValue("@Content", answer.Content ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@UserId", answer.UserId ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@UserName", answer.UserName ?? (object)DBNull.Value);
                using (SqlDataReader readers = command.ExecuteReader())
                {
                    return (AnswerGetResponse)readers[0];
                }
            }
        }

    }
}
