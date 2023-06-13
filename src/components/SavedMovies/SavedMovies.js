import React, { useEffect } from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import { savedMoviesList } from '../../utils/constants';
// import { emptyMoviesList } from '../../utils/constants';


function SavedMovies({
  handleHeader, handleFooter, isLoading
}) {

  useEffect(() => {
    handleHeader(true);
    handleFooter(true);
  }, [handleHeader, handleFooter]);

  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList
        moviesList={savedMoviesList}
        // moviesList={emptyMoviesList}

        savedMoviesComponent={true}
      />
    </main>
  );
}

export default SavedMovies;
