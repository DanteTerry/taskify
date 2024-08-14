import React from "react";
import AuthComponent from "../_components/AuthComponent";
import SignInForm from "../_components/SignInForm";

function SignIn() {
  return (
    <AuthComponent className="bg-authRegister">
      <SignInForm />
    </AuthComponent>
  );
}

export default SignIn;
