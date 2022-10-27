import React, { MouseEventHandler } from 'react';
interface Props {
  title: React.ReactNode;
  onClick: MouseEventHandler;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

export const PrimaryButton: React.FC<Props> = ({
  title,
  onClick,
  type = 'button',
}: Props) => {
  return (
    <button type={type} onClick={onClick} className="primary-btn">
      {title}
    </button>
  );
};
