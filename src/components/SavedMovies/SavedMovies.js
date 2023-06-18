import React, { useEffect } from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';



function SavedMovies({
  handleHeader, handleFooter, isLoading, handleSearchSavedMoviesSubmit,
  savedMovies, savedMoviesListTransmitted, isChecked, handleChangeChecked, removeLike
}) {


  useEffect(() => {
    handleHeader(true);
    handleFooter(true);
  }, [handleHeader, handleFooter]);

  const drawComponent = () => {
    if (savedMovies.length === 0) {
      return (<p className="movies-list__text-empty">У Вас нет сохранённых фильмов</p>);
    } else if (savedMoviesListTransmitted.length === 0) {
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
