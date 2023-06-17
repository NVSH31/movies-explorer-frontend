import React, { useEffect } from "react";
import './Register.css';
import AuthForm from "../AuthForm/AuthForm";
import Top from '../Top/Top';

function Register ({
  isLoading, handleHeader, handleFooter, handleRegister,
  isSubmitError, handleClearSubmitRegisterError
}) {

  useEffect(() => {
    handleHeader(false);
    handleFooter(false);
    handleClearSubmitRegisterError();
  }, [handleHeader, handleFooter]);


  return (
    <main className="register">
      <Top
        title={"Добро пожаловать!"}
      />
      <AuthForm
        handleSubmit={handleRegister}
        isLoading={isLoading}
        formType={'register'}
        isSubmitError={isSubmitError}
      />
    </main>
  );
}

export default Register;
