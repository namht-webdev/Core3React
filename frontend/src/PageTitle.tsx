import React from 'react';
interface Props {
  title?: string;
}

export const PageTitle: React.FC<Props> = ({ title }) => {
  return (
    <div className="text-[15px] font-bold my-[10px] mr-[5px] text-center uppercase">
      {title}
    </div>
  );
};
