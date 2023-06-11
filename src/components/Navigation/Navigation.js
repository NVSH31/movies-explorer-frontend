import { useState } from "react";
import './Navigation.css';
import { Link, useLocation } from "react-router-dom";
import ProfImage from '../../images/account.svg';
import BurgButton from '../../images/burg-button.svg';
import CloseIcon from '../../images/close-icon.svg';

function Navigation({loggedIn}) {

  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlerMenuOpen = () => {
    setIsMenuOpen(true);
  };
  const handlerMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      { !loggedIn && <nav className="navigation">
          <Link
            className="navigation__link_main medium"
            to="/signup"
          >
            Регистрация
          </Link>
          <Link
            className="navigation__button_main medium"
            to="/signin"
          >
            Войти
          </Link>
        </nav>
      }

      { loggedIn && <nav className="navigation navigation_visible">
          <Link
            className={`navigation__link ${ location.pathname === '/movies' && 'medium' }`}
            to="/movies"
          >
            Фильмы
          </Link>
          <Link
            className={`navigation__link ${ location.pathname === '/saved-movies' && 'medium' }`}
            to="/saved-movies"
          >
            Сохранённые фильмы
          </Link>
          <Link
            className="navigation__button" to="/profile"
          >
            <img src={ProfImage} className="navigation__button-image" alt="account" />
            <span className="medium">Аккаунт</span>
          </Link>
        </nav>
      }
      { loggedIn && (
        <>
          <img
            src={BurgButton}
            className="navigation__menu-open"
            alt="menu"
            onClick={handlerMenuOpen}
          />
          <div
            className={`navigation__overlay ${isMenuOpen && 'navigation__overlay_opened'}`}
          />
          <nav className={`navigation__mobile-menu ${isMenuOpen && 'navigation__mobile-menu_opened'}`}>
            <img
              src={CloseIcon}
              className="navigation__close-icon"
              alt="close"
              onClick={handlerMenuClose}
            />
            <Link
              className="navigation__link navigation__link_mobile"
              to="/"
              onClick={handlerMenuClose}
            >
              Главная
              { location.pathname === '/' &&
                <div className="navigation__underline"></div>
              }
            </Link>
            <Link
              className="navigation__link navigation__link_mobile"
              to="/movies"
              onClick={handlerMenuClose}
            >
              Фильмы
              { location.pathname === '/movies' &&
                <div className="navigation__underline"></div>
              }
            </Link>
            <Link
              className="navigation__link navigation__link_mobile"
              to="/saved-movies"
              onClick={handlerMenuClose}
            >
              Сохранённые фильмы
              { location.pathname === '/saved-movies' &&
                <div className="navigation__underline"></div>
              }
            </Link>
            <Link
              className="navigation__button navigation__button_mobile"
              to="/profile"
              onClick={handlerMenuClose}
            >
              <img src={ProfImage}
                className="navigation__button-image"
                alt="account"
              />
              Аккаунт
            </Link>

          </nav>
        </>
        )
      }
    </>
  );
}

export default Navigation;
