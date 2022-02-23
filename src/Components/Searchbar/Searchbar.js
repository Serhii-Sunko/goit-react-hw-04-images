import { PropTypes } from 'prop-types';
import React, { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onHandleInput = e => {
    setQuery(e.target.value);
  };

  const onHandleSubmit = e => {
    e.preventDefault();
    if (!query) {
      alert('Empty query');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onHandleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onHandleInput}
          value={query}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
