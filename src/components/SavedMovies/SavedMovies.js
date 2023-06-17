import React, { useEffect } from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';



function SavedMovies({
  handleHeader, handleFooter, isLoading, handleSearchSavedMoviesSubmit,
  moviesList
}) {

  useEffect(() => {
    handleHeader(true);
    handleFooter(true);
  }, [handleHeader, handleFooter]);

  return (
    <main className="saved-movies">
      <SearchForm
        handleSubmit={handleSearchSavedMoviesSubmit}
      />
      <MoviesCardList
        moviesList={moviesList}

        savedMoviesComponent={true}
      />
    </main>
  );
}

export default SavedMovies;
