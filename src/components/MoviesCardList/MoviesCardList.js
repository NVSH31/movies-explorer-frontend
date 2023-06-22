import React, { useEffect, useState } from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  START_CARDS_MORE_1280_PX, START_CARDS_MORE_990_PX, START_CARDS_MORE_665_PX, START_CARDS_MORE_320_PX,
  ADD_CARDS_MORE_1280_PX, ADD_CARDS_MORE_990_PX, ADD_CARDS_MORE_665_PX, ADD_CARDS_MORE_320_PX,
  WIDTH_1280_PX_4_CARDS, WIDTH_990_PX_3_CARDS, WIDTH_665_PX_2_CARDS, WIDTH_320_PX_1_CARDS, START_COUNT
} from '../../utils/constants';


function MoviesCardList({
  moviesList, savedMoviesComponent, setLike, removeLike, savedMovies
}) {

  const [count, setCount] = useState(START_COUNT);

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

    if (isWidth >= WIDTH_1280_PX_4_CARDS) {
      addCards(ADD_CARDS_MORE_1280_PX);
    } else if (isWidth >= WIDTH_990_PX_3_CARDS) {
      addCards(ADD_CARDS_MORE_990_PX);
    } else if (isWidth >= WIDTH_665_PX_2_CARDS) {
      addCards(ADD_CARDS_MORE_665_PX);
    } else if (isWidth >= WIDTH_320_PX_1_CARDS) {
      addCards(ADD_CARDS_MORE_320_PX);
    }
  }

  const controlButton = (arrLength, length) => {
    arrLength > length ? setIsButton(true) : setIsButton(false);
  }

  useEffect(() => {

    if (isWidth >= WIDTH_1280_PX_4_CARDS) {
      startCards(START_CARDS_MORE_1280_PX);
    } else if (isWidth >= WIDTH_990_PX_3_CARDS) {
      startCards(START_CARDS_MORE_990_PX);
    } else if (isWidth >= WIDTH_665_PX_2_CARDS) {
      startCards(START_CARDS_MORE_665_PX);
    } else {
      startCards(START_CARDS_MORE_320_PX);
    }

  }, [moviesList]);

  return (
    <section className={`movies-list ${ savedMoviesComponent && `movies-list_saved`}`}>
      <ul className="movies-list__list">
        { savedMoviesComponent ?
          moviesList.map(movie => {
          // currentList.map(movie => {
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
          moviesList.slice(START_COUNT, count).map(movie => {
          // currentList.slice(0, count).map(movie => {
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
