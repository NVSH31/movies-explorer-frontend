import React from "react";
import './Portfolio.css';

function Portfolio() {

  return (
    <div className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__element">
          <a className="portfolio__link"
            href="https://github.com/NVSH31/how-to-learn"
            target="blank"
          >
            <p className="portfolio__link-text">Статичный сайт</p>
            <div className="portfolio__link-icon"/>
          </a>
          <hr className="line line_gray"/>
        </li>
        <li className="portfolio__element">
          <a className="portfolio__link"
            href="https://github.com/NVSH31/russian-travel"
            target="blank"
          >
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <div className="portfolio__link-icon"/>
          </a>
          <hr className="line line_gray"/>
        </li>
        <li className="portfolio__element">
          <a className="portfolio__link"
            href="https://github.com/NVSH31/react-mesto-api-full-gha"
            target="blank"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <div className="portfolio__link-icon"/>
          </a>
        </li>
      </ul>

    </div>
  );
}

export default Portfolio;
