import React from "react";
import Input from "./input";
import Radio from "./radio";
import Checkbox from "./checkbox";

const FormikControl = (props) => {
  // rest is type, label, name
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;

    case "radio":
      return <Radio {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;

    default:
      return null;
  }
};
export default FormikControl;
