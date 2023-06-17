import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox({
  checked, changeChecked
}) {

  console.log('IN FilterCheckbox checked =', checked);

  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label">
        <input
          className="filter-checkbox__button"
          type="checkbox"
          checked={checked}
          onChange={changeChecked}
        />
      </label>
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
