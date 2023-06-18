import React, { useState, useEffect } from "react";
import './MoviesCard.css';
import { BEATFILMS_URL } from "../../utils/constants";

function MoviesCard({
  data, savedMoviesComponent, setLike, removeLike, savedMovies
}) {

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (savedMoviesComponent) {
      setIsLiked(savedMovies.some(movie => movie.movieId === data.movieId));
    } else {
      setIsLiked(savedMovies.some(movie => movie.movieId === data.id));
    }

  },[savedMovies]);

  const modifedDuration = (duration) => {
    if (duration < 60) {
      return `${duration}м`;
    } else {
      const minuts = Math.trunc(duration%60) ? ` ${Math.trunc(duration%60)}м` : '';
      return (`${Math.trunc(duration/60)}ч ${minuts}`);
    }
  }


  const handleLike = () => {
    setLike(data);
  }

  const handleDisLike = () => {
    removeLike(data, savedMoviesComponent);
  }

  const showCard = () => {
    if (!savedMoviesComponent) {
      return true;
    } else if (isLiked) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      { showCard() &&
        <li
          className={`movies-card ${savedMoviesComponent && 'movies-card_saved'}`}
        >
          <a href={data.trailerLink} target="blank">
            <img
              className="movies-card__image"
              src={savedMoviesComponent ? data.image : `${BEATFILMS_URL}${data.image.url}`}
              alt={data.nameRu}
            />
          </a>
          <div className="movies-card__container">
            <p className="movies-card__name">
              {data.nameRU}
            </p>
            { savedMoviesComponent ? (
              <button
              onClick={handleDisLike}
              className="movies-card__button movies-card__button_saved"
              />
            ) : (
              <button
                onClick={ isLiked ? handleDisLike : handleLike }
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
      }
    </>
  );
}

export default MoviesCard;
