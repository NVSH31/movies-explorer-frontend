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
import { SHORT_MOVIE } from '../../utils/constants';



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

  const [allMovies, setAllMovies] = useState([]);
  // const [moviesList, setMoviesList] = useState([]);
  // const [savedMovies, setSavedMovies] = useState([]);



  const navigate = useNavigate();


  const closePopup = () => {
    setIsPopupOpen(false);
    setIsPopupMessage('');
  }

  const openPopup = (message) => {
    setIsPopupOpen(true);
    setIsPopupMessage(message);
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

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      api.checkToken(jwt)
        .then(currentUserProfile => {
          if (currentUserProfile) {
            setLoggedIn(true);
            setCurrentUser(currentUserProfile);
            navigate('/movies', { replace: true });
          }
        })
        .catch((error) => {
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

  // useEffect(() => {
  //   if (loggedIn) {
  //     localStorage.setItem('isChecked', isChecked);
  //   }
  // },[loggedIn]);

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
    .catch((error) => {
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
    localStorage.removeItem('jwt');
    localStorage.removeItem('keyWordMovies');
    localStorage.removeItem('isChecked');
    localStorage.removeItem('moviesList');
    localStorage.removeItem('shortMoviesList');
    setLoggedIn(false);
    navigate('/', { replace: true });
  }


  const handleSearchMoviesSubmit = ({ keyWord }) => {

    if (keyWord) {

      setIsLoading(true);
      moviesApi.getMovies()
        .then(data => {

          // setAllMovies([data, ...allMovies]);
          setAllMovies(data);

          const moviesList = allMovies.filter(
            movie => movie.nameRU.toUpperCase().includes(keyWord.toUpperCase())
          );


          const shortMoviesList = moviesList.filter(movie => movie.duration <= SHORT_MOVIE);

          localStorage.setItem('keyWordMovies', keyWord);

          localStorage.setItem('isChecked', isChecked);

          localStorage.setItem('moviesList', JSON.stringify(moviesList));
          localStorage.setItem('shortMoviesList', JSON.stringify(shortMoviesList));

        })
        .catch(e => {
          console.log(e);
          // openPopup(e);
        })
        .finally(() => setIsLoading(false));
    }
  }

  const handleSearchSavedMoviesSubmit = ({ keyWord }) => {

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
