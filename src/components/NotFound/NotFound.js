import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './NotFound.css';

function NotFound({
  handleHeader, handleFooter
}) {

  useEffect(() => {
    handleHeader(false);
    handleFooter(false);
  }, [handleHeader, handleFooter]);

  return (
    <main className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <Link className="not-found__link" to="/">Назад</Link>
    </main>
  );
}

export default NotFound;
