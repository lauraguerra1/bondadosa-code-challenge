import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import React from 'react';
import './SearchBar.css'

const SearchBar = ({ className, searchTerm, updateSearchTerm, updateSearchParam }) => {
  const navigate = useNavigate();

  const searchForItem = (e) => {
    e.preventDefault();
    updateSearchParam({ q: searchTerm });
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  }
  return (
    <form className={className}>
      <input type='search' placeholder='Search for grocery items' value={searchTerm} onChange={(e) => updateSearchTerm(e.target.value)} />
      <button type='button' aria-label='search button' className='search-btn' onClick={searchForItem}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='icon'>
          <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
        </svg>
      </button>
    </form>
  )
}

SearchBar.propTypes = {
  className: PropTypes.string.isRequired, 
  searchTerm: PropTypes.string.isRequired, 
  updateSearchTerm: PropTypes.func.isRequired,
  updateSearchParam: PropTypes.func.isRequired
};

export default SearchBar