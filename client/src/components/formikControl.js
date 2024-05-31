import React from "react";
import Input from "./input";

import Radio from "./radio";

const FormikControl = (props) => {
  // rest is type, label, name
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;

    case "radio":
      return <Radio {...rest} />;

    default:
      return null;
  }
};
export default FormikControl;
