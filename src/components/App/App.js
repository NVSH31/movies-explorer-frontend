import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Popup from '../Popup/Popup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import api from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import { SHORT_MOVIE, MOVIES_SERVER_ERROR, BEATFILMS_URL } from '../../utils/constants';
import { setOne, setSeveral, removeSeveral } from '../../utils/localStorage';



function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isHeader, setIsHeader] = useState(true);
  const [isFooter, setIsFooter] = useState(true);
  const [isPopupMessage, setIsPopupMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isSubmitRegisterError, setIsSubmitRegisterError] = useState('');
  const [isSubmitLoginError, setIsSubmitLoginError] = useState('');
  const [isSubmitProfileError, setIsSubmitProfileError] = useState('');
  const [isSubmitProfileMessage, setIsSubmitProfileMessage] = useState('');

  const [isChecked, setIsChecked] = useState(false);
  const [isSavedChecked, setIsSavedChecked] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);

  const [moviesListTransmitted, setMoviesListTransmitted] = useState([]);
  const [savedMoviesListTransmitted, setSavedMoviesListTransmitted] = useState([]);


  const navigate = useNavigate();


  const closePopup = () => {
    setIsPopupOpen(false);
    setIsPopupMessage('');
  }

  const openPopup = (...message) => {
    setIsPopupOpen(true);
    let fullMessage = '';
    for (let i=0; i < message.length; i++) {
      fullMessage = fullMessage + ' ' + message[i];
    }
    setIsPopupMessage(fullMessage);
  }

  const handleClearSubmitLoginError = () => {
    setIsSubmitLoginError('');
  }

  const handleClearSubmitRegisterError = () => {
    setIsSubmitRegisterError('');
  }

  const handleClearSubmitProfileError = () => {
    setIsSubmitProfileError('');
  }

  const handleClearSubmitProfileMessage = () => {
    setIsSubmitProfileMessage('');
  }

  const handleChangeChecked = () => {
    setIsChecked(!isChecked);
    localStorage.setItem('isChecked', isChecked);
  }

  const handleChangeSavedChecked = () => {
    setIsSavedChecked(!isSavedChecked);
    localStorage.setItem('isSavedChecked', isSavedChecked);
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      Promise.all([api.checkToken(jwt), api.getSavedMovies()])
        .then(([currentUserProfile, movies]) => {
          if (currentUserProfile) {
            setLoggedIn(true);
            setCurrentUser(currentUserProfile);
            navigate('/movies', { replace: true });
          }
          setSavedMovies(movies.reverse());
        })
        .catch(error => {
          error
          .then(data => {
            console.log(data.message);
            openPopup(data.message);
          })
          .catch(e => {
            console.log(e);
            openPopup(e);
          })
        })
    }
  },[loggedIn]);

  const handleLogIn = (loginData) => {
    setIsSubmitLoginError('');
    setIsLoading(true);
    api.authorize(loginData.password, loginData.email)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        navigate('/movies', {replace: true});
      }
    })
    .catch(error => {
      error
      .then(data => {
        console.log(data.message);
        setIsSubmitLoginError(data.message);
      })
      .catch(e => {
        console.log(e);
        openPopup(e);;
      })
    })
    .finally(() => setIsLoading(false));
  }

  const handleRegister = (registerData) => {
    setIsSubmitRegisterError('');
    setIsLoading(true);
    api.register(registerData.name, registerData.email, registerData.password)
    .then((data) => {
      handleLogIn({ password: registerData.password, email: registerData.email });
    })
    .catch((error) => {
      error
      .then(data => {
        console.log(data.message);
        setIsSubmitRegisterError(data.message);
      })
      .catch(e => {
        console.log(e);
        openPopup(e);
      })
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  const handleUpdateUser = (userData) => {
    setIsSubmitProfileError('');
    setIsSubmitProfileMessage('');
    setIsLoading(true);
    api.editMe(userData.name, userData.email)
    .then((userData) => {
      setCurrentUser(userData);
      setIsSubmitProfileMessage('Ваши данные изменены');
    })
    .catch((error) => {
      error
      .then(data => {
        setIsSubmitProfileError(data.message);
      })
      .catch(e => {
        console.log(e);
        openPopup(e);
      })
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  const handleLogOut = () => {
    removeSeveral(
      'jwt', 'keyWordMovies', 'keyWordSavedMovies',
      'isChecked', 'isSavedChecked',
      'moviesList', 'shortMoviesList', 'allMovies'
    );
    setLoggedIn(false);
    navigate('/', { replace: true });
  }

  const handleSearchMoviesSubmit = ({ keyWord }) => {

    let moviesList = [];
    let shortMoviesList = [];

    const generateMoviesLists = () => {
      moviesList = JSON.parse(localStorage.getItem('allMovies')).filter(
        movie => movie.nameRU.toUpperCase().includes(keyWord.toUpperCase())
      );
      shortMoviesList = moviesList.filter(movie => movie.duration <= SHORT_MOVIE);

      setSeveral(
        ['keyWordMovies', keyWord],
        ['isChecked', isChecked],
        ['moviesList', JSON.stringify(moviesList)],
        ['shortMoviesList', JSON.stringify(shortMoviesList)],
      );

      isChecked ? setMoviesListTransmitted(shortMoviesList) : setMoviesListTransmitted(moviesList);
    }

    if (keyWord) {
      if (!localStorage.getItem('allMovies')) {
        setIsLoading(true);
        moviesApi.getMovies()
          .then(data => {
            setOne('allMovies', JSON.stringify(data));
            generateMoviesLists();
          })
          .catch(error => {
            error
            .then(data => {
              openPopup(MOVIES_SERVER_ERROR, data.statusCode, data.error);
              console.log('error :', data);
            })
            .catch(e => {
              console.log('e =' , e);
            })
          })
          .finally(() => setIsLoading(false));
      } else {
        generateMoviesLists();
      }

    }
  }

  const handleSearchSavedMoviesSubmit = ({ keyWord }) => {
    if (keyWord) {
      let moviesList = [];
      let shortMoviesList = [];

      moviesList = savedMovies.filter(
        movie => movie.nameRU.toUpperCase().includes(keyWord.toUpperCase())
      );
      shortMoviesList = moviesList.filter(movie => movie.duration <= SHORT_MOVIE);

      setSeveral(
        ['keyWordSavedMovies', keyWord],
        ['isSavedChecked', isSavedChecked],
      );

      overwriteStateArray(
        savedMoviesListTransmitted,
        setSavedMoviesListTransmitted,
        isSavedChecked ? shortMoviesList : moviesList
      );
    }
  }

  const overwriteStateArray = (stateArray, setStateArray, newArray) => {
    let copy = Object.assign([], stateArray);
    copy.splice(0, stateArray.length);
    copy.push(...newArray);
    setStateArray(copy);
  }

  const setLike = (movie) => {
    api.saveMovie({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${BEATFILMS_URL}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `${BEATFILMS_URL}${movie.image.formats.thumbnail.url}`,
      movieId: String(movie.id),
    })
    .then(newSavedMovie => {
      setSavedMovies([newSavedMovie, ...savedMovies]);
    })
    .catch(error => {
      error
      .then(data => {
        openPopup(data.message);
      })
      .catch(e => {
        console.log(e);
        openPopup(e);
      })
    });
  }

  const removeLike = (movie, savedMoviesComponent) => {

    let deletedMovie = {};

    if (savedMoviesComponent) {
      deletedMovie = movie;
    } else {
      deletedMovie = savedMovies.find(item => item.movieId === movie.id);
    }

    api.deleteMovie(deletedMovie._id)
    .then(() => {
      setSavedMovies((state) => state.filter(item => item._id !== deletedMovie._id));
    })
    .catch((error) => {
      error
      .then(data => {
        openPopup(data.message);
      })
      .catch(e => {
        console.log(e);
        openPopup(e);
      })
    });
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        { isHeader && <Header loggedIn={loggedIn}/> }
        <Routes>
          <Route path='/' element={
            <Main
              handleHeader={setIsHeader}
              handleFooter={setIsFooter}
            />
          }/>
          <Route path='/signin' element={
            loggedIn ? <Main handleHeader={setIsHeader} handleFooter={setIsFooter} /> :
            <Login
              isLoading={isLoading}
              handleHeader={setIsHeader}
              handleFooter={setIsFooter}
              handleLogIn={handleLogIn}
              isSubmitError={isSubmitLoginError}
              handleClearSubmitLoginError={handleClearSubmitLoginError}
            />
          } />

          <Route path='/signup' element={
            loggedIn ? <Main handleHeader={setIsHeader} handleFooter={setIsFooter} /> :
            <Register
              isLoading={isLoading}
              handleHeader={setIsHeader}
              handleFooter={setIsFooter}
              handleRegister={handleRegister}
              isSubmitError={isSubmitRegisterError}
              handleClearSubmitRegisterError={handleClearSubmitRegisterError}
            />
          } />

          <Route path='/profile' element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Profile}
              handleHeader={setIsHeader}
              handleFooter={setIsFooter}
              isLoading={isLoading}
              handleLogOut={handleLogOut}
              handleUpdateUser={handleUpdateUser}
              isSubmitError={isSubmitProfileError}
              handleClearSubmitProfileError={handleClearSubmitProfileError}
              isSubmitMessage={isSubmitProfileMessage}
              handleClearSubmitProfileMessage={handleClearSubmitProfileMessage}
            />
          } replace />

          <Route path='/movies' element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Movies}
              handleHeader={setIsHeader}
              handleFooter={setIsFooter}
              isLoading={isLoading}
              handleSearchMoviesSubmit={handleSearchMoviesSubmit}
              isChecked={isChecked}
              handleChangeChecked={handleChangeChecked}
              moviesListTransmitted={moviesListTransmitted}
              setLike={setLike}
              removeLike={removeLike}
              savedMovies={savedMovies}
            />
          } replace />

          <Route path='/saved-movies' element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={SavedMovies}
              handleHeader={setIsHeader}
              handleFooter={setIsFooter}
              isLoading={isLoading}
              handleSearchSavedMoviesSubmit={handleSearchSavedMoviesSubmit}
              openPopup={openPopup}
              savedMovies={savedMovies}
              savedMoviesListTransmitted={savedMoviesListTransmitted}
              isChecked={isSavedChecked}
              handleChangeChecked={handleChangeSavedChecked}
              removeLike={removeLike}
            />
          } replace />

          <Route path='*'
            element={
              <NotFound
                handleHeader={setIsHeader}
                handleFooter={setIsFooter}
              />
            }
          />
        </Routes>
        { isFooter && <Footer /> }
        { isPopupMessage &&
          <Popup
            message={isPopupMessage}
            isOpen={isPopupOpen}
            onClose={closePopup}
          />
        }
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
