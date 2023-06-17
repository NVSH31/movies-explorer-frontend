import React, { useEffect } from "react";
import '../Register/Register.css';
import AuthForm from "../AuthForm/AuthForm";
import Top from '../Top/Top';

function Login ({
  isLoading, handleHeader, handleFooter, handleLogIn,
  isSubmitError, handleClearSubmitLoginError
}) {

  useEffect(() => {
    handleHeader(false);
    handleFooter(false);
    handleClearSubmitLoginError();
  }, [handleHeader, handleFooter]);

  return (
    <main className="register">
      <Top
        title={"Рады видеть!"}
      />
      <AuthForm
        handleSubmit={handleLogIn}
        isLoading={isLoading}
        formType={'login'}
        isSubmitError={isSubmitError}
      />
    </main>
  );
}

export default Login;
