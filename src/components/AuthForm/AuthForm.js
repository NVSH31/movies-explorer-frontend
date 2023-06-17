import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './AuthForm.css';
import { validName, validEmail } from "../../utils/validators";

function AuthForm ({
  handleSubmit,
  formType,
  isLoading,
  isSubmitError
}) {

  const buttonText = () => {
    if (formType === 'register') {
      return (isLoading ? 'Регистрация...' : 'Зарегистрироваться');
    } else if (formType === 'login') {
      return (isLoading ? 'Вход...' : 'Войти');
    }
  }

  const [inputsValid, setInputsValid] = useState(false);

  const validators = {
    nameInput: {
      required: (value) => { return value === ''; },
      minLength: (value) => { return (value !== undefined ? value.length < 2 : true); },
      maxLength: (value) => { return (value !== undefined ? value.length > 30 : true); },
      typeName: (value) => { return (validName(value)); }
    },
    emailInput: {
      required: (value) => { return value === ''; },
      typeEmail: (value) => { return (validEmail(value)); }
    },
    passwordInput: {
      required: (value) => { return value === ''; },
      minLength: (value) => { return (value !== undefined ? value.length < 6 : true); },
    },
  }

  const [errors, setErrors] = useState({
    nameInput: {
      required: true,
      minLength: true,
      maxLength: true,
      typeName: true
    },
    emailInput: {
      required: true,
      typeEmail: true
    },
    passwordInput: {
      required: true,
      minLength: true,
    },
  });

  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputValues(prevState => ({...prevState, [name]: value}));
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (formType === 'register') {
      return (
        handleSubmit({
          name: inputValues.name,
          email: inputValues.email,
          password: inputValues.password
        })
      );
    }

    if (formType === 'login') {
      return (
        handleSubmit({
          email: inputValues.email,
          password: inputValues.password
        })
      );
    }
  }

  useEffect(() => {

    const inputNameValid = Object.keys(validators.nameInput).map(errorKey => {
      const errorResult = validators.nameInput[errorKey](inputValues.name);

      return { [errorKey]: errorResult }
    }).reduce((acc, el) => ({...acc, ...el}), {});

    const inputEmailValid = Object.keys(validators.emailInput).map(errorKey => {
      const errorResult = validators.emailInput[errorKey](inputValues.email);

      return { [errorKey]: errorResult }
    }).reduce((acc, el) => ({...acc, ...el}), {});

    const inputPasswordValid = Object.keys(validators.passwordInput).map(errorKey => {
      const errorResult = validators.passwordInput[errorKey](inputValues.password);

      return { [errorKey]: errorResult }
    }).reduce((acc, el) => ({...acc, ...el}), {});

    setInputsValid(
      !(formType === 'register' && Object.values(inputNameValid).some(value => value === true)) &&
      !(Object.values(inputEmailValid).some(value => value === true)) &&
      !(Object.values(inputPasswordValid).some(value => value === true))
    );

    setErrors({
      nameInput: inputNameValid,
      emailInput: inputEmailValid,
      passwordInput: inputPasswordValid,
    });

  }, [inputValues, setErrors]);


  return (
    <section className="auth-form">
      <form
        className="auth-form__form"
        name={ formType === 'register' ? 'register' : 'login'}
        onSubmit={handleSubmitForm}
        noValidate
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
              className="auth-form__input"
              onChange={handleChangeInputs}
              value={inputValues.name || ''}
            />
            <p
              className="auth-form__error"
              id="name-input-error"
            >
              { errors.nameInput.required && 'Обязательное поле. ' }
              { errors.nameInput.minLength && 'Не менее 2 символов. ' }
              { errors.nameInput.maxLength && 'Не более 30 символов. ' }
              { errors.nameInput.typeName && 'Только буквы, пробел или дефис. ' }
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
            className="auth-form__input"
            onChange={handleChangeInputs}
            value={inputValues.email || ''}
          />
          <p
            className="auth-form__error"
            id="email-input-error"
          >
            { errors.emailInput.required && 'Вы пропустили это поле. ' }
            { errors.emailInput.typeEmail && 'Должен быть Email. ' }
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
            className="auth-form__input"
            onChange={handleChangeInputs}
            minLength={6}
            value={inputValues.password || ''}
          />
          <p
            className="auth-form__error"
            id="password-input-error"
          >
            { errors.passwordInput.required && 'Обязательное поле. ' }
            { errors.passwordInput.minLength && 'Не менее 6 символов. ' }
          </p>
        </div>
        <p
          className="auth-form__error auth-form__error_form auth-form__error_visible"
          id="form-error"
        >
          {isSubmitError}
        </p>
        { inputsValid ? (
          <button
            type="submit"
            className={`auth-form__submit ${formType === 'login' && 'auth-form__submit_login'}`}
          >
            {buttonText()}
          </button>
        ) : (
          <button
            type="submit"
            className={`auth-form__submit ${formType === 'login' && 'auth-form__submit_login'} auth-form__submit_disabled`}
          >
            {buttonText()}
          </button>
        ) }

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
