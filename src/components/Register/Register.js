import React, { useEffect } from "react";
import './Register.css';
import AuthForm from "../AuthForm/AuthForm";
import Top from '../Top/Top';

function Register ({
  isLoading, handleHeader, handleFooter
}) {

  useEffect(() => {
    handleHeader(false);
    handleFooter(false);
  }, [handleHeader, handleFooter]);


  return (
    <main className="register">
      <Top
        title={"Добро пожаловать!"}
      />
      <AuthForm
        isLoading={isLoading}
        formType={'register'}
      />
    </main>
  );
}

export default Register;
