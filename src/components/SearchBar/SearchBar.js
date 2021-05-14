import React, { useState } from "react";
import PropTypes from 'prop-types';

import './SearchBar.css';

function ShortFilmsFilter({isFiltering, onStartFiltering, onStopFiltering}) {
return (
  <button className={isFiltering ? 'search__radiobutton search__radiobutton_active' : 'search__radiobutton'}
          onClick={isFiltering ? onStopFiltering : onStartFiltering}
          type='button'></button>
)

}

function SearchBar({term = '', isFiltering = false, onSearchSubmit, onStartFiltering, onStopFiltering}) {
  const isSearchEmpty = () => {
    return searchTerm.length > 2;
  }
  const [searchTerm, setSearchTerm] = useState(term);
  const [isSubmitDisabled, setSubmitDisabled] = useState(!isSearchEmpty());
  const handleSearchTermChange = (event) => {
    const input = event.target;
    setSearchTerm(input.value);
    setSubmitDisabled(!isSearchEmpty());
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(searchTerm);
  }
  return (
    <section className='search'>
      <form className='search__form'>
        <input
          id='search-input'
          name='searchInput'
          type='text'
          className='search__input'
          required
          minLength='3'
          maxLength='40'
          value={searchTerm}
          placeholder='Фильм'
          onChange={handleSearchTermChange}/>
        <button
          type='submit'
          className='search__button'
          onClick={handleSubmit}
          disabled={isSubmitDisabled}>
          Поиск
        </button>
      </form>
      <ShortFilmsFilter isFiltering={isFiltering} onStartFiltering={onStartFiltering} onStopFiltering={onStopFiltering} />
    </section>
  )

}

ShortFilmsFilter.propTypes = {
  isFiltering: PropTypes.bool.isRequired,
  onStartFiltering: PropTypes.func.isRequired,
  onStopFiltering: PropTypes.func.isRequired,
}

SearchBar.propTypes = {
  term: PropTypes.string,
  isFiltering: PropTypes.bool,
  onSearchSubmit: PropTypes.func.isRequired,
  onStartFiltering: PropTypes.func.isRequired,
  onStopFiltering:PropTypes.func.isRequired,
}

export default SearchBar;
