import { useState, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from './PrimaryButton';
import { QuestionList } from './QuestionList';
import { getUnanseredQuestions, QuestionData } from './QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';

export const HomePage: FC = () => {
  const [questions, setQuestions] = useState<QuestionData[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnanseredQuestions();
      setQuestions(unansweredQuestions);
      setQuestionsLoading(false);
    };
    doGetUnansweredQuestions();
  }, []);
  const handleAskQuestionClick = () => {
    navigate('/ask');
  };
  return (
    <Page>
      <div className="mx-auto mt-12 mb-5 py-7 px-5 max-w-[600px]">
        <div className="flex items-center justify-between">
          <PageTitle title="Unanswered Questions" />
          <PrimaryButton
            onClick={handleAskQuestionClick}
            title="Ask a questions"
          />
        </div>
        {questionsLoading ? (
          <div className="text-[16px] italic">Loading ...</div>
        ) : (
          <QuestionList data={questions || []} />
        )}
      </div>
    </Page>
  );
};
