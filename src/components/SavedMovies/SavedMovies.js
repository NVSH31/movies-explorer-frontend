import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import { NULL_LENGTH } from "../../utils/constants";
import { updatePages } from "../../utils/localStorage";


function SavedMovies({
  handleHeader, handleFooter, isLoading, handleSearchSavedMoviesSubmit,
  savedMovies, savedMoviesListTransmitted, isChecked, handleChangeChecked, removeLike
}) {

  const location = useLocation();

  useEffect(() => {
    handleHeader(true);
    handleFooter(true);
    updatePages(location.pathname);
  }, [handleHeader, handleFooter]);

  const drawComponent = () => {
    if (savedMovies.length === NULL_LENGTH) {
      return (<p className="movies-list__text-empty">У Вас нет сохранённых фильмов</p>);
    } else if (savedMoviesListTransmitted.length === NULL_LENGTH) {
      return (<p className="movies-list__text-empty">Ничего не найдено</p>);
    } else {
      return <MoviesCardList
        moviesList={savedMoviesListTransmitted}
        savedMoviesComponent={true}
        removeLike={removeLike}
        savedMovies={savedMovies}
      />;
    }
  }

  return (
    <main className="saved-movies">
      <SearchForm
        handleSubmit={handleSearchSavedMoviesSubmit}
        isChecked={isChecked}
        handleChangeChecked={handleChangeChecked}
        savedMoviesComponent={true}
      />
      { drawComponent() }
    </main>
  );
}

export default SavedMovies;
