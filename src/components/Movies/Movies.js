import React, { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesList } from '../../utils/constants';


function Movies({
  handleHeader, handleFooter, isLoading
}) {

  useEffect(() => {
    handleHeader(true);
    handleFooter(true);
  }, [handleHeader, handleFooter]);

  return (
    <main className="main">
      <SearchForm />
      { isLoading ? <Preloader/> :
        <MoviesCardList
          moviesList={moviesList}
          savedMoviesComponent={false}
        />
      }
    </main>
  );
}

export default Movies;
