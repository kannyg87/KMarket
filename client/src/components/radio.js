import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./textError";

function Radio(props) {
  const { label, name, options, ...rest } = props;

  return (
    <div className="form-control radio-container">
      <label>{label}</label>
      <Field name={name}>
        {({ field }) => (
          options.map(option => (
            <div key={option.key} className="radio-container">
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
