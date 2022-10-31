import { useState, Fragment, useEffect } from 'react';
import { PageTitle } from './PageTitle';
import { Page } from './Page';
import { useParams } from 'react-router-dom';
import { getQuestion, QuestionData } from './QuestionsData';
import { AnswerList } from './AnswerList';
import { Form } from './Form';
import { Field } from './Field';
import { required, minLength } from './Form';

export const QuestionPage = () => {
  const [question, setQuestion] = useState<QuestionData | null>(null);
  const { questionId } = useParams();
  useEffect(() => {
    const doGetQuestion = async (questionId: number) => {
      const foundQuestion = await getQuestion(questionId);
      setQuestion(foundQuestion);
    };
    if (questionId) {
      doGetQuestion(Number(questionId));
    }
  }, [questionId]);
  return (
    <Page>
      <PageTitle title="Question" />
      <div className="bg-white px-5 pt-[15px] pb-5 rounded-[4px] border-solid border-t-[1px] border-[#f7f8fa] shadow-[0_3px_5px_0_rgba(0,0,0,0.16)]">
        <div className="text-[19px] font-bold my-[10px] mr-[5px]">
          {question === null ? '' : question.title}
        </div>
        {question !== null && (
          <Fragment>
            <p className="bg-white">{question.content}</p>
            <div className="text-3 italic text-[#857c81]">{`Ask by ${
              question.userName
            } on ${question.created.toLocaleDateString()} ${question.created.toLocaleTimeString()}`}</div>
            <AnswerList data={question.answers} />
            <div className="mt-5">
              <Form
                submitCaption="Submit Your Answer"
                validationRules={{
                  content: [
                    {
                      validator: required,
                    },
                    { validator: minLength, args: 50 },
                  ],
                }}
              >
                <Field name="content" type="TextArea" label="Your answer" />
              </Form>
            </div>
          </Fragment>
        )}
      </div>
    </Page>
  );
};
