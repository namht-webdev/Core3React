using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            throw new NotImplementedException();
        }

        public QuestionGetSingleResponse GetQuestion(int questionId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<QuestionGetManyResponse> GetQuestions()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch(string search)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions()
        {
            throw new NotImplementedException();
        }

        public bool QuestionExists(int questionId)
        {
            throw new NotImplementedException();
        }
    }
}
