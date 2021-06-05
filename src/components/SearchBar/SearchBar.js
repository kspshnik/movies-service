import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './SearchBar.css';

const ShortFilmsFilter = ({ isFiltering, onClickRadio }) => (
  <div className='search__shortfilms'>
    <button
      className={isFiltering ? 'search__radiobutton search__radiobutton_active' : 'search__radiobutton'}
      onClick={onClickRadio}
      type='button' />
    <p className='search__label'>Короткометражки</p>
  </div>
);

function SearchBar({
  term, isFiltering = false, onSearchSubmit, onClickRadio,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    setSearchTerm(term);
    setSubmitDisabled(false);
  }, [term]);

  const handleSearchTermChange = (event) => {
    const input = event.target;
    setSearchTerm(input.value);
    setSubmitDisabled((input.value.length < 2) && (input.value.length > 0));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(searchTerm);
  };
  return (
    <section className='search'>
      <form className='search__form' onSubmit={onSearchSubmit}>
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
          onChange={handleSearchTermChange} />
        <button
          type='submit'
          className={`search__button ${isSubmitDisabled ? 'search__button_disabled' : ''}`}
          onClick={handleSubmit}
          disabled={isSubmitDisabled}>
          Поиск
        </button>
      </form>
      <ShortFilmsFilter
        isFiltering={isFiltering}
        onClickRadio={onClickRadio} />
    </section>
  );
}

ShortFilmsFilter.propTypes = {
  isFiltering: PropTypes.bool.isRequired,
  onClickRadio: PropTypes.func.isRequired,
};

SearchBar.propTypes = {
  term: PropTypes.string.isRequired,
  isFiltering: PropTypes.bool.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  onClickRadio: PropTypes.func.isRequired,
};

export default SearchBar;
