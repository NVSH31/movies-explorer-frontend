import React, { useEffect, useContext } from "react";
import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({
  handleHeader, handleFooter, isLoading
}) {

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    handleHeader(true);
    handleFooter(false);
  }, [handleHeader, handleFooter]);

  return (
    <main className="main">
      <h1 className="profile__title">
        Привет, {currentUser.name}!
      </h1>
      <form className="profile__form">
        <div className="profile__data-container">
          <div className="profile__input-container">
            <label className="profile__label">Имя</label>
            <input
              className="profile__input"
              type="text"
              required
              id="name-input"
              // value={currentUser.name}
              placeholder="Ваше имя"
            />
          </div>
          <hr className="line line_gray"/>
          <div className="profile__input-container">
            <label className="profile__label">E-mail</label>
            <input
              className="profile__input"
              type="email"
              required
              id="email-input"
              // value={currentUser.email}
              placeholder="Ваша почта"
            />
          </div>
        </div>
        <button type="submit" className="profile__button">
          Редактировать
        </button>
      </form>
      <button className="profile__button profile__button_logout">
        Выйти из аккаунта
      </button>
    </main>
  );
}

export default Profile;
