import React from "react";
import './Footer.css';

function Footer() {
  const year = new Date();
  return (
    <footer className="footer">
      <p className="footer__text footer__text_title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <hr className="line line_gray"/>
      <div className="footer__container">
        <p className="footer__text footer__text_little-gray">
          &copy; {year.getFullYear()}
        </p>
        <ul className="footer__link-list">
          <li>
            <a
              className="footer__text footer__text_link"
              href="https://practicum.yandex.ru/"
              target="blank"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__link-element">
            <a
              className="footer__text footer__text_link"
              href="https://github.com/NVSH31"
              target="blank"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
