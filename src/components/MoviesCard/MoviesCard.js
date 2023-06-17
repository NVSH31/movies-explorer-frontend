import React from "react";
import './MoviesCard.css';
import { BEATFILMS_URL } from "../../utils/constants";

function MoviesCard({
  data, savedMoviesComponent, isLiked
}) {

  const modifedDuration = (duration) => {
    if (duration < 60) {
      return `${duration}м`;
    } else {
      const minuts = Math.trunc(duration%60) ? ` ${Math.trunc(duration%60)}м` : '';
      return (`${Math.trunc(duration/60)}ч ${minuts}`);
    }
  }

  return (
    <li
      className={`movies-card ${savedMoviesComponent && 'movies-card_saved'}`}
    >
      <img
        className="movies-card__image"
        src={savedMoviesComponent ? data.image : `${BEATFILMS_URL}${data.image.url}`}
        alt={data.nameRu}
      />
      <div className="movies-card__container">
        <p className="movies-card__name">
          {data.nameRU}
        </p>
        { savedMoviesComponent ? (
          <button
          className="movies-card__button movies-card__button_saved"
          />
        ) : (
          <button
            className={
              `movies-card__button ${ isLiked ?
                'movies-card__button_is-liked' :
                'movies-card__button_not-liked'}`
            }
          />
        ) }
      </div>
      <hr className="line line_gray"/>
      <p className="movies-card__duration">
        { modifedDuration(data.duration) }
      </p>
    </li>
  );
}

export default MoviesCard;
