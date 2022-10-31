import { FC, useContext, ChangeEvent } from 'react';
import { FormContext } from './Form';
interface Props {
  name: string;
  label?: string;
  type?: 'Text' | 'TextArea' | 'Password';
}

export const Field: FC<Props> = ({ name, label, type = 'Text' }) => {
  const { setValue, touched, validate, setTouched } = useContext(FormContext);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (setValue) {
      setValue(name, e.currentTarget.value);
    }
    if (touched[name] && validate) {
      validate(name);
    }
  };
  const handleBlur = () => {
    if (setTouched) setTouched(name);
    if (validate) validate(name);
  };
  return (
    <FormContext.Consumer>
      {({ values, errors }) => (
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
              value={values[name] === undefined ? '' : values[name]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
          {type === 'TextArea' && (
            <textarea
              id={name}
              className="field h-[100px]"
              value={values[name] === undefined ? '' : values[name]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
          {errors[name] &&
            errors[name].length > 0 &&
            errors[name].map((error) => (
              <div className="text-[12px] text-red-500" key={error}>
                {error}
              </div>
            ))}
        </div>
      )}
    </FormContext.Consumer>
  );
};
