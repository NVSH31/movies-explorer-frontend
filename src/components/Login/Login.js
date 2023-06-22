import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../Register/Register.css';
import AuthForm from "../AuthForm/AuthForm";
import Top from '../Top/Top';
import { updatePages } from "../../utils/localStorage";

function Login ({
  isLoading, handleHeader, handleFooter, handleLogIn,
  isSubmitError, handleClearSubmitLoginError, isBlocked, setIsBlocked
}) {

  const location = useLocation();

  useEffect(() => {
    handleHeader(false);
    handleFooter(false);
    handleClearSubmitLoginError();
    setIsBlocked(false);
    updatePages(location.pathname);
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
        isBlocked={isBlocked}
      />
    </main>
  );
}

export default Login;
