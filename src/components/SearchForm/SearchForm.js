import React from "react";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Lupa from '../../images/lupa.svg';

function SearchForm() {

  return (
    <section className="search-form">
      <form className="search-form__container-main">
        <img src={Lupa} className="search-form__icon" alt="icon"/>
        <input
          id="search-input"
          name="search"
          className="search-form__input"
          type="text"
          required
          placeholder="Фильм"
        />
        <button type="submit" className="search-form__submit">
          Найти
        </button>
        <div className="search-form__line-vert"></div>
        <FilterCheckbox />
      </form>
      <hr className="line line_gray"/>
    </section>
  );
}

export default SearchForm;
