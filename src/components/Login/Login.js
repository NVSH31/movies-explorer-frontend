import React, { useEffect } from "react";
import '../Register/Register.css';
import AuthForm from "../AuthForm/AuthForm";
import Top from '../Top/Top';

function Login ({
  isLoading, handleHeader, handleFooter
}) {

  useEffect(() => {
    handleHeader(false);
    handleFooter(false);
  }, [handleHeader, handleFooter]);

  return (
    <main className="register">
      <Top
        title={"Рады видеть!"}
      />
      <AuthForm
        isLoading={isLoading}
        formType={'login'}
      />
    </main>
  );
}

export default Login;
