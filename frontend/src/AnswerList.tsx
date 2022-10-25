import { FC } from 'react';
import { AnswerData } from './QuestionsData';
import { Answer } from './Answer';

interface Props {
  data: AnswerData[];
}

export const AnswerList: FC<Props> = ({ data }) => {
  return (
    <ul className="mt-[10px] p-0 list-none">
      {data.map((answer) => (
        <li
          key={answer.answerId}
          className="border-solid border-t-[1px] border-[#e3e2e2]"
        >
          <Answer data={answer} />
        </li>
      ))}
    </ul>
  );
};
