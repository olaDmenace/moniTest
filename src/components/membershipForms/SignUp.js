import React from "react";
import FormInput from "../formInput/FormInput";

const SignUp = ({
  password,
  setPassword,
  email,
  setEmail,
  fullName,
  setFullName,
  confirmPassword,
  setConfirmPassword,
}) => {
  const onChange = (arg, e) => {
    arg(e.target.value);
  };
  return (
    <>
      <FormInput
        placeholder={"Name"}
        type={"text"}
        id={"name"}
        value={fullName}
        onChange={(e) => onChange(setFullName, e)}
      />
      <FormInput
        placeholder={"Email Address"}
        type={"mail"}
        id={"email"}
        required={true}
        value={email}
        onChange={(e) => onChange(setEmail, e)}
      />
      <FormInput
        placeholder={"Password"}
        type={"password"}
        id={"password"}
        required={true}
        value={password}
        onChange={(e) => {
          onChange(setPassword, e);
        }}
      />
      <FormInput
        placeholder={"Confirm Password"}
        type={"password"}
        id={"confirmPassword"}
        required={true}
        value={confirmPassword}
        onChange={(e) => onChange(setConfirmPassword, e)}
      />
    </>
  );
};

export default SignUp;
