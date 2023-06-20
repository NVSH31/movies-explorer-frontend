import React, { useEffect } from "react";
import './Register.css';
import { useLocation } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import Top from '../Top/Top';
import { updatePages } from "../../utils/localStorage";

function Register ({
  isLoading, handleHeader, handleFooter, handleRegister,
  isSubmitError, handleClearSubmitRegisterError, isBlocked, setIsBlocked
}) {

  const location = useLocation();

  useEffect(() => {
    handleHeader(false);
    handleFooter(false);
    handleClearSubmitRegisterError();
    setIsBlocked(false);
    updatePages(location.pathname);
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
        isBlocked={isBlocked}
      />
    </main>
  );
}

export default Register;
