import React from "react";
import './AboutProject.css';

function AboutProject() {

  return (
    <section className="about-project" id="about-project">
      <p className="section-name">О проекте</p>
      <hr className="line"/>
      <div className="about-project__container">
        <div className="about-project__block">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>

        <div className="about-project__block">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__time-block">
        <div className="about-project__backend-block">
          1 неделя
          <p className="about-project__time-signature">Back-end</p>
        </div>
        <div className="about-project__frontend-block">
          4 недели
          <p className="about-project__time-signature">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
