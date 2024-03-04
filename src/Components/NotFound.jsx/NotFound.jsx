import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import noResults from '../../images/no-results.png';
import './NotFound.css'

const NotFound = ({ searchTerm, orderId }) => {
  useEffect(() => {
    document.title = '404 | Virtual Grocer'
    return () => document.title = 'Virtual Grocer'
  }, []);

  return (
    <div className='no-results'>
      {!searchTerm && !orderId
        ? <div className='no-results'>
            <h2 className='semi-bold text-lg'>Uh-oh! This page couldn't be found.</h2>
            <img className='no-results-img' src={noResults} alt='no results found' />
            <p>We’re sorry! We can’t seem to find the page you’re looking for. This can happen when you have an expired link, or one that has moved.</p>
            <p>Maybe a search will get you on your way.</p>
          </div>
        : searchTerm
          ? <p className='semi-bold'>Sorry, no results were found for "{searchTerm}"</p>
          : <p className='semi-bold'>Sorry, we couldn't find any order number matching "{orderId}". <span className='italic normal'>Search for an item and add it to your cart to start an order!</span></p>
      }
      {(searchTerm?.length > 0 || orderId?.length > 0) && <img className='no-results-img' src={noResults} alt='no results found' />}
    </div>
  )
}

NotFound.propTypes = {
  searchTerm: PropTypes.string,
  orderId: PropTypes.string
}

export default NotFound