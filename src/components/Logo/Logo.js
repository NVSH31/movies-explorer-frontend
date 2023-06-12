import React from "react";
import './Logo.css';
import Logotip from '../../images/logo.svg';
import { Link } from "react-router-dom";

function Logo() {

  return (
    <Link className="logo" to="/">
      <img src={Logotip} alt="логотип" className="logo__image"/>
    </Link>
  );
}

export default Logo;
