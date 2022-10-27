import React, { useState, createContext } from 'react';
import { PrimaryButton } from './PrimaryButton';
interface Values {
  [key: string]: any;
}
interface FormContextProps {
  values: Values;
  setValue?: (fieldName: string, value: any) => void;
}
interface Props {
  submitCaption?: string;
  children?: React.ReactNode;
  type?: 'submit';
}

export const FormContext = createContext<FormContextProps>({
  values: {},
});

export const Form: React.FC<Props> = ({
  submitCaption,
  children,
  type = 'submit',
}) => {
  const [values, setValues] = useState<Values>();
  return (
    <form noValidate={true}>
      <fieldset className="form">
        {children}
        <div className="mt-7 pt-5 border-solid border-t-[1px] border-[#e3e2e2]">
          <PrimaryButton
            type={type}
            title={submitCaption}
            onClick={() => console.log(123)}
          />
        </div>
      </fieldset>
    </form>
  );
};
