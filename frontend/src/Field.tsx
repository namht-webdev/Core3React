import { FC } from 'react';

interface Props {
  name: string;
  label?: string;
  type?: 'Text' | 'TextArea' | 'Password';
}

export const Field: FC<Props> = ({ name, label, type = 'Text' }) => (
  <div className="flex flex-col mb-[15px]">
    {label && (
      <label className="font-bold" htmlFor={name}>
        {label}
      </label>
    )}
    {(type === 'Text' || type === 'Password') && (
      <input type={type.toLowerCase()} id={name} className="field" />
    )}
    {type === 'TextArea' && <textarea id={name} className="field h-[100px]" />}
  </div>
);
