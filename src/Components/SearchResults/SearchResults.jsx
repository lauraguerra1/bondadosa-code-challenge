import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getItem, getMoreItems } from '../../utils/apiCalls';
import './SearchResults.css'
import brokenImg from '../../images/broken-img.png';

const SearchResults = ({ searchParams, cart, updateCart }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [nextApi, setNextApi] = useState('')

  const callAPI = async (apiCall, argument, type) => {
    try {
      const data = await apiCall(argument);
      type === 'new' ? setSearchResults(data.hints) : setSearchResults(prev => [...prev, ...data.hints])
      if(data["_links"].next.href) setNextApi(data["_links"].next.href)
    } catch (error) {
      console.log(error);
      setSearchResults([])
    }
  };

  useEffect(() => { 
    callAPI(getItem, (searchParams.get('q') || ''), 'new');
  }, [searchParams])

  if (!searchParams.get('q')) {
    return <p className='results-page'>search for something</p>
  }

  const getOrder = (index, parentLength) => {
    if (index === parentLength - 1) return 'last'
    if (index === parentLength - 2) return 'second-last'
    if (index === parentLength - 3) return 'third-last'
    return ''
  }

  const uniqueResults = searchResults.reduce((acc, curr) => {
    if (!acc.find(item => curr.food.foodId === item.food.foodId)) acc.push(curr);
    return acc;
  }, [])

  return (
    <section className='results-page'>
    <p className='semi-bold'>Showing {uniqueResults.length} result{uniqueResults.length === 1 ? '' : 's'} for {searchParams.get('q') || ''} </p>
    <div className={`results ${uniqueResults.length % 2 === 0 ? 'even-length' : 'odd-length'} ${uniqueResults.length % 3 === 0 ? 'flush-thirds' : ''} ${uniqueResults.length % 3 === 1 ? 'single-remainder' : ''}`}>
        {uniqueResults.map((item, index) => 
          <div className={`single-result ${getOrder(index, uniqueResults.length)} ${index % 2 === 0 ? '' : 'odd'} ${index % 3 === 0 ? 'every-third' : ''}`} key={item.food.foodId}>
            <img src={item.food.image || brokenImg} alt={item.food.label} />
            <p className='semi-bold'>{item.food.label}</p>
            <button className='add-cart-btn' onClick={() => updateCart(item)}>{cart.find(cartItem => cartItem.food.foodId === item.food.foodId) ? 'REMOVE FROM' : 'ADD TO'} CART</button>
          </div>
        )}
      </div>
      {nextApi.length > 0 && <button className='view-more' onClick={() => callAPI(getMoreItems, nextApi, 'add')}>View More Items</button>}
    </section>
  )
}

SearchResults.propTypes = {
  searchParams: PropTypes.object.isRequired, 
  cart: PropTypes.array.isRequired, 
  updateCart: PropTypes.func.isRequired
}

export default SearchResults