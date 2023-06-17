import React, { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function Movies({
  handleHeader, handleFooter, isLoading, handleSearchMoviesSubmit,
  isChecked, handleChangeChecked
}) {

  let moviesList = [];

  if (localStorage.getItem('shortMoviesList')
    && isChecked
  ) {
    moviesList = JSON.parse(localStorage.getItem('shortMoviesList'));
    // console.log('IN 1');
  } else if (localStorage.getItem('moviesList')
    && !isChecked
  ) {
    moviesList = JSON.parse(localStorage.getItem('moviesList'));
    // console.log('IN 2');
  }

  // if (localStorage.getItem('shortMoviesList')
  //   && localStorage.getItem('isChecked')
  //   && localStorage.getItem('isChecked') === 'false'
  // ) {
  //   moviesList = JSON.parse(localStorage.getItem('shortMoviesList'));
  //   console.log('IN 1');
  // } else if (localStorage.getItem('moviesList')
  //   && localStorage.getItem('isChecked')
  //   && localStorage.getItem('isChecked') === 'true'
  // ) {
  //   moviesList = JSON.parse(localStorage.getItem('moviesList'));
  //   console.log('IN 2');
  // }

  // console.log('IN 3');

  useEffect(() => {
    handleHeader(true);
    handleFooter(true);
  }, [handleHeader, handleFooter]);

  return (
    <main className="main">
      <SearchForm
        handleSubmit={handleSearchMoviesSubmit}
        isChecked={isChecked}
        handleChangeChecked={handleChangeChecked}
      />
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
