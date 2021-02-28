import React, {FunctionComponent} from "react";
import {Controller, FieldError} from "react-hook-form";
import {Input} from "rsuite";
import {Control} from "react-hook-form/dist/types/form";
import s from "./ControlledInput.module.css";

type IProps = {
  name: string;
  control: Control;
  rules: {[key: string]: string | boolean | number};
  size: string;
  placeholder: string;
  defaultValue?: string;
  errors: {[key: string]: FieldError};
};

export const ControlledInput: FunctionComponent<IProps> = (props) => {
  const isError = props.errors[props.name];
  return <Controller
    defaultValue={props.defaultValue || ''}
    name={props.name}
    control={props.control}
    rules={props.rules}
    render={({ onChange, value }) => {
      return (<Input size={props.size}
                     className={isError ? s.error : undefined}
                     style={{marginBottom: '10px'}}
                     placeholder={props.placeholder}
                     onChange={onChange}
                     value={value} />)
    }}
  />
};
