import React from "react";
import './Top.css';
import Logo from "../Logo/Logo";


function Top({
  title
}) {

  return (
    <section className="top">
      <Logo/>
      <h1 className="top__title">
        {title}
      </h1>
    </section>
  );
}

export default Top;
