import React, { useState, useEffect } from "react";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Lupa from '../../images/lupa.svg';

function SearchForm({
  handleSubmit, isChecked, handleChangeChecked
}) {

  const [inputValue, setInputValue] = useState('');
  const [isEmptyInput, setIsEmptyInput] = useState(false);


  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    if (localStorage.getItem('keyWordMovies')
    ) {
      setInputValue(localStorage.getItem('keyWordMovies'));
    }
  },[]);

  const onSubmit = (e) => {
    e.preventDefault();

    handleSubmit({
      keyWord: inputValue
    });

    inputValue ? setIsEmptyInput(false) : setIsEmptyInput(true);
  }


  return (
    <section className="search-form">
      <form
        className="search-form__container-main"
        onSubmit={onSubmit}
        noValidate
      >
        <img src={Lupa} className="search-form__icon" alt="лупа"/>
        <input
          id="search-input"
          name="search"
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          onChange={handleChangeInput}
          value={inputValue || ''}
        />
        <button type="submit" className="search-form__submit">
          Найти
        </button>
        <div className="search-form__line-vert"></div>
        <FilterCheckbox
          checked={isChecked}
          changeChecked={handleChangeChecked}
        />
        <p className={`search-form__empty-input ${ isEmptyInput && 'search-form__empty-input_visible' }`}>
          Нужно ввести ключевое слово
        </p>
      </form>
      <hr className="line line_gray"/>
    </section>
  );
}

export default SearchForm;
