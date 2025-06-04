import React from "react";

interface InputProps {
  onChange: any;
  value: string | number;
  type: string;
  id?: string;
  name?: string;
  placeholder?: string;
  isError?: boolean;
}

export const Input: React.FC<InputProps> = (props) => {
  const inputClassName = props.isError ? "error_input" : "input";

  return <input onChange={props.onChange} value={props.value} type={props.type} id={props.id} name={props.name} placeholder={props.placeholder} className={inputClassName} />;
};
