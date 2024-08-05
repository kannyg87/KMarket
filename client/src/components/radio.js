import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./textError";

function Radio(props) {
  const { label, name, options, ...rest } = props;

  return (
    <div className="mb-5 flex flex-col items-start text-left">
      <label>{label}</label>
      <Field name={name}>
        {({ field }) => (
          options.map(option => (
            <div key={option.key} className="flex flex-col items-start text-left">
              <input
                type="radio"
                id={option.value}
                {...field}
                {...rest}
                value={option.value}
                checked={field.value === option.value}
                className=""
              />
              <label htmlFor={option.value}>{option.key}</label>
            </div>
          ))
        )}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Radio;
