import React, { useEffect } from "react";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";


function Main({
  logout, handleHeader, handleFooter
}) {

  useEffect(() => {
    handleHeader(true);
    handleFooter(true);
    logout();
  }, [handleHeader, handleFooter, logout]);


  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  );
}

export default Main;
