import React, { MouseEventHandler } from 'react';

interface Props {
  title: React.ReactNode;
  onClick: MouseEventHandler;
}

export const PrimaryButton: React.FC<Props> = ({ title, onClick }: Props) => {
  return (
    <button onClick={onClick} className="primary-btn">
      {title}
    </button>
  );
};
