import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { NULL_LENGTH } from '../../utils/constants';
import { updatePages } from '../../utils/localStorage';


function Movies({
  handleHeader, handleFooter, isLoading, handleSearchMoviesSubmit,
  isChecked, handleChangeChecked, moviesListTransmitted, setLike, removeLike,
  savedMovies
}) {

  const location = useLocation();

  useEffect(() => {
    handleHeader(true);
    handleFooter(true);
    updatePages(location.pathname);
  }, [handleHeader, handleFooter]);

  const drawComponent = () => {
    if (isLoading) {
      return <Preloader />;
    } else if (!localStorage.getItem('allMovies')) {
      return (<p className="movies-list__text-empty">Начните поиск</p>);
    } else if (moviesListTransmitted.length === NULL_LENGTH) {
      return (<p className="movies-list__text-empty">Ничего не найдено</p>);
    } else {
      return <MoviesCardList
        moviesList={moviesListTransmitted}
        savedMoviesComponent={false}
        setLike={setLike}
        removeLike={removeLike}
        savedMovies={savedMovies}
      />;
    }
  }

  return (
    <main className="main">
      <SearchForm
        handleSubmit={handleSearchMoviesSubmit}
        isChecked={isChecked}
        handleChangeChecked={handleChangeChecked}
        savedMoviesComponent={false}
      />
      { drawComponent() }
    </main>
  );
}

export default Movies;
