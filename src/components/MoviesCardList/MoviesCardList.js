import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({
  moviesList, savedMoviesComponent
}) {

  return (
    <section className={`movies-list ${ savedMoviesComponent && `movies-list_saved`}`}>
      {
        moviesList.length === 0 &&
        <p className="movies-list__text-empty">
          Фильмов нет
        </p>
      }
      <ul className="movies-list__list">
        {
          moviesList && moviesList.length !== 0 &&
          moviesList.map((movie) => {

            const isLiked = true;

            return (
              <MoviesCard
                key={movie._id}
                data={movie}
                savedMoviesComponent={savedMoviesComponent}
                isLiked={isLiked}
              />
            );
          })
        }
      </ul>
      { !savedMoviesComponent && moviesList.length !== 0 &&
        <button className="movies-list__button">
          Ещё
        </button>
      }
    </section>
  );
}

export default MoviesCardList;
