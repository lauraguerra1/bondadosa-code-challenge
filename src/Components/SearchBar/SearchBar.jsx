import PropTypes from 'prop-types';
import React from 'react';
import './SearchBar.css'

const SearchBar = ({className}) => {
  return (
    <form className={className}>
      <input type='search' placeholder='Search for grocery items' />
      <button className='search-btn'>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='icon'>
          <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
        </svg>
      </button>
    </form>
  )
}


SearchBar.propTypes = {
  className: PropTypes.string.isRequired
};
export default SearchBar