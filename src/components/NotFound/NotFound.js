import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './NotFound.css';
import { updatePages } from "../../utils/localStorage";

function NotFound({
  handleHeader, handleFooter
}) {

  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(localStorage.getItem('prevPage'), {replace: true});
  }

  useEffect(() => {
    handleHeader(false);
    handleFooter(false);
    updatePages(location.pathname);
  }, [handleHeader, handleFooter]);


  return (
    <main className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__link" onClick={handleBack}>
        Назад
      </button>
    </main>
  );
}

export default NotFound;
