import { FC } from 'react';
import { QuestionData } from './QuestionsData';
import { Question } from './Question';
interface Props {
  data: QuestionData[];
  renderItem?: (item: QuestionData) => JSX.Element;
}

export const QuestionList: FC<Props> = ({ data, renderItem }) => {
  return (
    <ul className="question-list">
      {data.map((question) => (
        <li
          key={question.questionId}
          className="border-solid border-t-[1px] border-[#e3e2e2]"
        >
          {renderItem ? renderItem(question) : <Question data={question} />}
        </li>
      ))}
    </ul>
  );
};
