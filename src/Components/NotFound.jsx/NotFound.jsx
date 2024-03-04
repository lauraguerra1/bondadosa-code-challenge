import React from 'react';
import PropTypes from 'prop-types';
import noResults from '../../images/no-results.png';
import './NotFound.css'

const NotFound = ({searchTerm, orderId}) => {
  return (
    <div className='no-results'>
      {searchTerm
        ? <p className='semi-bold'>Sorry, no results were found for "{searchTerm}"</p>
        : <p className='semi-bold'>Sorry, we couldn't find any order number matching "{orderId}". <span className='italic normal'>Search for an item and add it to your cart to start an order!</span></p>
      }
      <img className='no-results-img' src={noResults} alt='no results found' />
    </div>
  )
}

NotFound.propTypes = {
  searchTerm: PropTypes.string,
  orderId: PropTypes.string
}

export default NotFound