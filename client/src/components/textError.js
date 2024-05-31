import React from "react";

const TextError = (props) =>{
  const error ={
    color: 'red',
  }
  return(
    <div style={error}>
        {props.children}
    </div>
  )
}
export default TextError;