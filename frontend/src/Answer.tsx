import { FC } from 'react';
import { AnswerData } from './QuestionsData';

interface Props {
  data: AnswerData;
}

export const Answer: FC<Props> = ({ data }) => {
  return (
    <div className="py-[10px]">
      <div className="py-[10px] text-[13px]">{data.content}</div>
      <div className="text-[12px] italic text-[#857c81]">
        {`Answer by ${
          data.userName
        } on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
      </div>
    </div>
  );
};
