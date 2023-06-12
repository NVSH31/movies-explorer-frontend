import React from "react";
import { Link } from "react-router-dom";
import './AuthForm.css';

function AuthForm ({
  formType,
  isLoading
}) {

  const buttonText = () => {
    if (formType === 'register') {
      return (isLoading ? 'Регистрация...' : 'Зарегистрироваться');
    } else if (formType === 'login') {
      return (isLoading ? 'Вход...' : 'Войти');
    }
  }

  return (
    <section className="auth-form">
      <form
        className="auth-form__form"
        name={ formType === 'register' ? 'register' : 'login'}
      >
        {formType === 'register' && (
          <div className="auth-form__input-container">
            <label className="auth-form__label">
              Имя
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ваше имя"
              required
              className="auth-form__input"
            />
            <p
              className="auth-form__error auth-form__error_visible"
              id="name-error"
            >Это сообщение валидатора
            </p>
          </div>
        )}
        <div className="auth-form__input-container">
          <label className="auth-form__label">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Ваша почта"
            required
            className="auth-form__input"
          />
          <p
            className="auth-form__error"
            id="name-error"
          >
          </p>
        </div>
        <div className="auth-form__input-container">
          <label className="auth-form__label">
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Ваш пароль"
            required
            className="auth-form__input"
          />
          <p
            className="auth-form__error"
            id="name-error"
          >
          </p>
        </div>
        <button
          type="submit"
          className={`auth-form__submit ${formType === 'login' && 'auth-form__submit_login'}`}
        >
          {buttonText()}
        </button>
      </form>
      {formType === 'register' &&
        <p className="auth-form__submit-signature">
          Уже зарегистрированы?
        <Link to="/signin" className="auth-form__link"> Войти</Link>
      </p>
      }
      {formType === 'login' &&
        <p className="auth-form__submit-signature">
          Ещё не зарегистрированы?
        <Link to="/signup" className="auth-form__link"> Регистрация</Link>
      </p>
      }
    </section>
  );
}

export default AuthForm;
