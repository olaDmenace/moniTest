import React from "react";
import FormInput from "../formInput/FormInput";

const SignIn = ({
  // username,
  // setUsername,
  password,
  setPassword,
  email,
  setEmail,
}) => {
  return (
    <>
      <FormInput
        placeholder={"Email Address"}
        type={"mail"}
        id={"email"}
        required={true}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        placeholder={"Password"}
        type={"password"}
        id={"password"}
        required={true}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </>
  );
};

export default SignIn;
