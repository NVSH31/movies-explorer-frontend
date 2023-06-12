import React from "react";
import './AboutMe.css';
import Portfolio from "../Portfolio/Portfolio";
import Photo from '../../images/photo.jpg';


function AboutMe() {

  return (
    <section className="about-me" id="about-me">
      <p className="section-name">Студент</p>
      <hr className="line"/>
      <div className="about-me__main-container">
        <div className="about-me__text-container">
          <h2 className="about-me__name">Наталия</h2>
          <h3 className="about-me__profession-age">
            Фронтенд-разработчик, 37 лет
          </h3>
          <p className="about-me__text">
            Я родилась и живу в Саратове, закончила факультет нано и био медицинских технологий СГУ.
            У меня есть муж, сын и дочь. Мне нравится фронтенд разработка,
            это даётся мне легко и приносит удовольствие.
            Увлекаюсь плаванием, посещаю спортзал, веду здоровый образ жизни.
          </p>
          <a
            className="about-me__link" target="blank"
            href="https://github.com/NVSH31"
          >Github</a>
        </div>
        <img className="about-me__photo" src={Photo} alt="аватар" />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
