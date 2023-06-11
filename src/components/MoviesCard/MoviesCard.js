import React from "react";
import './MoviesCard.css';

function MoviesCard({
  data, savedMoviesComponent, isLiked
}) {


  return (
    <li
      className={`movies-card ${savedMoviesComponent && 'movies-card_saved'}`}
    >
      <img className="movies-card__image" src={data.image} alt="preview"/>
      <div className="movies-card__container">
        <p className="movies-card__name">
          {data.nameRu}
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
        {data.duration}
      </p>
    </li>
  );
}

export default MoviesCard;
