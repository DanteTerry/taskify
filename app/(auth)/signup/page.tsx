"use client";
import React from "react";
import AuthComponent from "../_components/AuthComponent";
import RegisterForm from "../_components/RegisterForm";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function SignUp() {
  const router = useRouter();

  const { data: session } = useSession();

  if (session) {
    router.push("/dashboard");
  }
  return (
    <AuthComponent className="bg-authRegister">
      <RegisterForm />
    </AuthComponent>
  );
}

export default SignUp;
