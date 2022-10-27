import { FC, useContext, ChangeEvent } from 'react';
import { FormContext } from './Form';
interface Props {
  name: string;
  label?: string;
  type?: 'Text' | 'TextArea' | 'Password';
}

export const Field: FC<Props> = ({ name, label, type = 'Text' }) => {
  const { setValue } = useContext(FormContext);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (setValue) {
      setValue(name, e.currentTarget.value);
    }
  };
  return (
    <FormContext.Consumer>
      {({ values }) => (
        <div className="flex flex-col mb-[15px]">
          {label && (
            <label className="font-bold" htmlFor={name}>
              {label}
            </label>
          )}
          {(type === 'Text' || type === 'Password') && (
            <input
              type={type.toLowerCase()}
              id={name}
              className="field"
              value={values[name] ? '' : values[name]}
              onChange={handleChange}
            />
          )}
          {type === 'TextArea' && (
            <textarea
              id={name}
              className="field h-[100px] value={context.values[name] ? '' : context.values[name]}"
              onChange={handleChange}
            />
          )}
        </div>
      )}
    </FormContext.Consumer>
  );
};
