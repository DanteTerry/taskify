import React from "react";
import AuthComponent from "../_components/AuthComponent";
import RegisterForm from "../_components/RegisterForm";

function SignUp() {
  return (
    <AuthComponent className="bg-authRegister">
      <RegisterForm />
    </AuthComponent>
  );
}

export default SignUp;
