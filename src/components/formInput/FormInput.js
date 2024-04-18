import React from "react";

const FormInput = (props) => {
  return (
    <input
      type={props.type}
      id={props.id}
      name={props.id}
      required={props.required}
      placeholder={props.placeholder}
      value={props.value}
      disabled={props.disabled}
      onChange={props.onChange}
      min={props.min}
      max={props.max}
      defaultValue={props.defaultValue}
      className="py-4 px-4 w-full rounded-lg bg-[#F0F1F5]/70 outline-none"
    />
  );
};

export default FormInput;
