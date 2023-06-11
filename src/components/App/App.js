import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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

import { constUser } from '../../utils/constants';


function App() {

  const [loggedIn, setLoggetIn] = useState(true);
  const [currentUser, setCurrentUser] = useState(constUser);
  const [isHeader, setIsHeader] = useState(true);
  const [isFooter, setIsFooter] = useState(true);
  const [isPopupMessage, setIsPopupMessage] = useState(
    'Какая-то ошибка API! Тут очень длинный текст этой ошибки.'
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);


  const closePopup = () => {
    setIsPopupOpen(false);
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
            <Login
              isLoading={isLoading}
              handleHeader={setIsHeader}
              handleFooter={setIsFooter}
            />
          } />

          <Route path='/signup' element={
            <Register
              isLoading={isLoading}
              handleHeader={setIsHeader}
              handleFooter={setIsFooter}
            />
          } />

          <Route path='/profile'
            element={
              <Profile
                handleHeader={setIsHeader}
                handleFooter={setIsFooter}
                isLoading={isLoading}
              />
          } />

          <Route path='/movies'
            element={
              <Movies
                handleHeader={setIsHeader}
                handleFooter={setIsFooter}
                isLoading={isLoading}
              />
          } />

          <Route path='/saved-movies'
            element={
              <SavedMovies
                handleHeader={setIsHeader}
                handleFooter={setIsFooter}
                isLoading={isLoading}
              />
          } />

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
