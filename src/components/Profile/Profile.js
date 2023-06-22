import React, { useEffect, useContext, useState } from "react";
import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { validName, validEmail } from "../../utils/validators";
import { useLocation } from "react-router-dom";
import { updatePages } from "../../utils/localStorage";

function Profile({
  handleHeader, handleFooter, isLoading, handleLogOut,
  handleUpdateUser, isSubmitError, handleClearSubmitProfileError,
  isSubmitMessage, handleClearSubmitProfileMessage,
  isBlocked, setIsBlocked
}) {

  const currentUser = useContext(CurrentUserContext);

  const location = useLocation();

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
    }
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
    }
  });


  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
  });

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputValues(prevState => ({...prevState, [name]: value}));
  }

  useEffect(() => {
    setInputValues({
      name: currentUser.name,
      email: currentUser.email,
    });
    setIsBlocked(false);
  }, [currentUser]);

  useEffect(() => {
    handleHeader(true);
    handleFooter(false);
    handleClearSubmitProfileError();
    handleClearSubmitProfileMessage();
    updatePages(location.pathname);
  }, [handleHeader, handleFooter]);

  useEffect(() => {

    const inputNameValid = Object.keys(validators.nameInput).map(errorKey => {
      const errorResult = validators.nameInput[errorKey](inputValues.name);

      return { [errorKey]: errorResult }
    }).reduce((acc, el) => ({...acc, ...el}), {});

    const inputEmailValid = Object.keys(validators.emailInput).map(errorKey => {
      const errorResult = validators.emailInput[errorKey](inputValues.email);

      return { [errorKey]: errorResult }
    }).reduce((acc, el) => ({...acc, ...el}), {});

    setInputsValid(
      !(Object.values(inputNameValid).some(value => value === true)) &&
      !(Object.values(inputEmailValid).some(value => value === true)) &&
      ((inputValues.name !== currentUser.name) || (inputValues.email !== currentUser.email))
    );

    setErrors({
      nameInput: inputNameValid,
      emailInput: inputEmailValid,
    });

  }, [inputValues, setErrors]);


  const handleSubmit = (e) => {
    e.preventDefault();

    handleUpdateUser({
      name: inputValues.name,
      email: inputValues.email,
    });
  }

  return (
    <main className="main">
      <h1 className="profile__title">
        Привет, {currentUser.name}!
      </h1>
      <form className="profile__form" onSubmit={handleSubmit} noValidate>
        <div className="profile__data-container">
          <div className="profile__input-container">
            <label className="profile__label">Имя</label>
            <input
              className={`profile__input ${ isBlocked && 'blocked' }`}
              type="text"
              name="name"
              id="name-input"
              placeholder="Ваше имя"
              onChange={handleChangeInputs}
              value={inputValues.name || ''}
            />
            <p
              id="name-input-error"
              className="profile__input-error"
            >
              { errors.nameInput.required && 'Обязательное поле. ' }
              { errors.nameInput.minLength && 'Не менее 2 символов. ' }
              { errors.nameInput.maxLength && 'Не более 30 символов. ' }
              { errors.nameInput.typeName && 'Только буквы, пробел или дефис. ' }
            </p>
          </div>
          <hr className="line line_gray"/>
          <div className="profile__input-container">
            <label className="profile__label">E-mail</label>
            <input
              className={`profile__input ${ isBlocked && 'blocked' }`}
              type="email"
              name="email"
              id="email-input"
              placeholder="Ваша почта"
              onChange={handleChangeInputs}
              value={inputValues.email || ''}
            />
            <p
              id="email-input-error"
              className="profile__input-error"
            >
              { errors.emailInput.required && 'Вы пропустили это поле. ' }
              { errors.emailInput.typeEmail && 'Должен быть Email. ' }
            </p>
          </div>
        </div>
        { inputsValid ? (
          <button
            type="submit" className={`profile__button ${isBlocked && 'blocked'}`}>
            {isLoading ? 'Редактирование...' : 'Редактировать'}

          </button>
        ) : (
          <button
            type="submit"
            className="profile__button profile__button_disabled"
            disabled
          >
            {isLoading ? 'Редактирование...' : 'Редактировать'}
          </button>
        )}
        <p className="profile__form-error">
          <span className="black">
            {isSubmitMessage}
          </span>
        </p>
        <p className="profile__form-error">
          {isSubmitError}
        </p>
      </form>
      <button
       className="profile__button profile__button_logout"
       onClick={handleLogOut}
      >
        Выйти из аккаунта
      </button>
    </main>
  );
}

export default Profile;
