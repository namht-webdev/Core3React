import { useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from './PrimaryButton';
import { QuestionList } from './QuestionList';
import { QuestionData } from './QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getUnansweredQuestionsActionCreator, AppState } from './Store';

interface Props {
  getUnansweredQuestions: () => Promise<void>;
  questions: QuestionData[] | null;
  questionsLoading: boolean;
}

const HomePage: FC<Props> = ({
  questions,
  questionsLoading,
  getUnansweredQuestions,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (questions === null) {
      getUnansweredQuestions();
    }
  }, [questions, getUnansweredQuestions]);

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

const mapStateToProps = (store: AppState) => {
  return {
    questions: store.questions.unanswered,
    questionsLoading: store.questions.loading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getUnansweredQuestions: () =>
      dispatch(getUnansweredQuestionsActionCreator()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
