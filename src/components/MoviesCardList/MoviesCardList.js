import React, { useEffect, useState } from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  START_CARDS_BEF_1280, START_CARDS_BEF_990, START_CARDS_BEF_665, START_CARDS_BEF_320,
  ADD_CARDS_BEF_1280, ADD_CARDS_BEF_990, ADD_CARDS_BEF_665, ADD_CARDS_BEF_320,
  WIDTH_1280_4, WIDTH_990_3, WIDTH_665_2, WIDTH_320_1
} from '../../utils/constants';


function MoviesCardList({
  moviesList, savedMoviesComponent, setLike, removeLike, savedMovies
}) {

  const [count, setCount] = useState(0);

  const [isWidth, setIsWidth] = useState(window.screen.width);
  const [isButton, setIsButton] = useState(false);

  const getWidth = (e) => {
    setIsWidth(window.screen.width);
  }

  window.addEventListener('resize', (e) => {
    getWidth();
  });

  const addCards = (increment) => {
    let newCount = count;
    newCount += increment;
    setCount(newCount);
    controlButton(moviesList.length, newCount);
  }

  const startCards = (startCount) => {
    setCount(startCount);
    controlButton(moviesList.length, startCount);
  }

  const handleClick = () => {

    if (isWidth >= WIDTH_1280_4) {
      addCards(ADD_CARDS_BEF_1280);
    } else if (isWidth >= WIDTH_990_3) {
      addCards(ADD_CARDS_BEF_990);
    } else if (isWidth >= WIDTH_665_2) {
      addCards(ADD_CARDS_BEF_665);
    } else if (isWidth >= WIDTH_320_1) {
      addCards(ADD_CARDS_BEF_320);
    }
  }

  const controlButton = (arrLength, length) => {
    arrLength > length ? setIsButton(true) : setIsButton(false);
  }

  localStorage.getItem('')

  useEffect(() => {

    if (isWidth >= WIDTH_1280_4) {
      startCards(START_CARDS_BEF_1280);
    } else if (isWidth >= WIDTH_990_3) {
      startCards(START_CARDS_BEF_990);
    } else if (isWidth >= WIDTH_665_2) {
      startCards(START_CARDS_BEF_665);
    } else {
      startCards(START_CARDS_BEF_320);
    }

  }, [moviesList]);

  return (
    <section className={`movies-list ${ savedMoviesComponent && `movies-list_saved`}`}>
      <ul className="movies-list__list">
        { savedMoviesComponent ?
          moviesList.map(movie => {
            return (
              <MoviesCard
                key={ savedMoviesComponent ? movie._id : movie.id}
                data={movie}
                savedMoviesComponent={savedMoviesComponent}
                removeLike={removeLike}
                savedMovies={savedMovies}
              />
            );
          }) :
          moviesList.slice(0, count).map(movie => {
            return (
              <MoviesCard
                key={ savedMoviesComponent ? movie._id : movie.id}
                data={movie}
                savedMoviesComponent={savedMoviesComponent}
                setLike={setLike}
                removeLike={removeLike}
                savedMovies={savedMovies}
              />
            );
          })
        }
      </ul>
      { !savedMoviesComponent && isButton &&
        <button
          className="movies-list__button"
          onClick={handleClick}
        >
          Ещё
        </button>
      }
    </section>
  );
}

export default MoviesCardList;
