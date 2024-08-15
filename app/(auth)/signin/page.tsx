"use client";
import React from "react";
import AuthComponent from "../_components/AuthComponent";
import SignInForm from "../_components/SignInForm";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function SignIn() {
  const router = useRouter();

  const { data: session } = useSession();

  if (session) {
    router.push("/dashboard");
  }
  return (
    <AuthComponent className="bg-authRegister">
      <SignInForm />
    </AuthComponent>
  );
}

export default SignIn;
