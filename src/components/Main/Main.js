import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import { updatePages } from "../../utils/localStorage";


function Main({
  handleHeader, handleFooter, loggedIn
}) {

  const location = useLocation();

  useEffect(() => {
    handleHeader(true);
    handleFooter(true);
    if (loggedIn) {
      updatePages(location.pathname);
    }

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
