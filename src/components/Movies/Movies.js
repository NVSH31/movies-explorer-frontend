import React, { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function Movies({
  handleHeader, handleFooter, isLoading, handleSearchMoviesSubmit,
  isChecked, handleChangeChecked, moviesListTransmitted, setLike, removeLike,
  savedMovies
}) {


  useEffect(() => {
    handleHeader(true);
    handleFooter(true);
  }, [handleHeader, handleFooter]);

  const drawComponent = () => {
    if (isLoading) {
      return <Preloader />;
    } else if (!localStorage.getItem('allMovies')) {
      return (<p className="movies-list__text-empty">Начните поиск</p>);
    } else if (moviesListTransmitted.length === 0) {
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
