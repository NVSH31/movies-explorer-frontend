import React, { useEffect } from "react";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";


function Main({
  handleHeader, handleFooter
}) {

  useEffect(() => {
    handleHeader(true);
    handleFooter(true);
  }, [handleHeader, handleFooter]);


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
