import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export const Page: React.FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto mt-7 mb-5 py-7 px-5 max-w-[600px]">{children}</div>
  );
};
