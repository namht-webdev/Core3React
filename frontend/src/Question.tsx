import { FC } from 'react';
import { QuestionData } from './QuestionsData';
import { Link } from 'react-router-dom';
interface Props {
  data: QuestionData;
  showContent?: boolean;
}

export const Question: FC<Props> = ({ data, showContent = true }: Props) => {
  return (
    <div className="py-[10px]">
      <Link className="text-[#5c5a5a]" to={`questions/${data.questionId}`}>
        <div className="py-[10px] text-[19px]">{data.title}</div>
      </Link>
      {showContent && (
        <div className="pb-[10px] text-[15px] text-[#5c5a5a]">
          {data.content.length > 50
            ? `${data.content.substring(0, 50)}...`
            : data.content}
        </div>
      )}
      <div className="text-[12px] italic text-[#857c81]">
        {`Ask by ${data.userName}`} on {data.created.toLocaleDateString()}
        {data.created.toLocaleTimeString()}
      </div>
    </div>
  );
};
