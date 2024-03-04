import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getItem, getMoreItems } from '../../utils/apiCalls';
import './SearchResults.css';
import brokenImg from '../../images/broken-img.png';
import QuantityChanger from '../QuanityChanger/QuantityChanger.jsx';
import Loading from '../Loading/Loading.jsx';
import Error from '../Error/Error.jsx';
import noResults from '../../images/no-results.png'

const SearchResults = ({ searchParams, cart, updateCart, changeQuantity }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [nextApi, setNextApi] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callAPI = async (apiCall, argument, type) => {
    setLoading(true);
    try {
      const data = await apiCall(argument);
      type === 'new' ? setSearchResults(data.hints) : setSearchResults(prev => [...prev, ...data.hints])
      if (data["_links"]?.next.href) setNextApi(data["_links"].next.href);
      setLoading(false);
    } catch (error) {
      setError(error);
      setSearchResults([])
      setLoading(false);
    }
  };

  useEffect(() => { 
    setNextApi('');
    callAPI(getItem, (searchParams.get('q') || ''), 'new');

    return () => setError(null)
  }, [searchParams])

  if (!searchParams.get('q')) {
    return <p className='results-page search-placeholder'>Search for something! Try things like <span className='italic'>"pizza"</span>, <span className='italic'>"coffee"</span>, or <span className='italic'>"almond milk"</span>.</p>
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

  if (loading) return <Loading />
  if (error) return <Error errorStatus={error.message} />

  return (
    <section className='results-page'>
    {
      uniqueResults.length > 0
        ? <p className='semi-bold'>Showing {uniqueResults.length} result{uniqueResults.length === 1 ? '' : 's'} for "{searchParams.get('q') || ''}"</p>
        : <p className='semi-bold'>Sorry, no results were found for "{searchParams.get('q') || ''}"</p>
    }
    {
      uniqueResults.length > 0 ?
          <div className={`results ${uniqueResults.length % 2 === 0 ? 'even-length' : 'odd-length'} ${uniqueResults.length % 3 === 0 ? 'flush-thirds' : ''} ${uniqueResults.length % 3 === 1 ? 'single-remainder' : ''}`}>
          {uniqueResults.map((item, index) => {
            const itemInCart = cart.find(cartItem => cartItem.food.foodId === item.food.foodId);
            return (
              <div className={`single-result ${getOrder(index, uniqueResults.length)} ${index % 2 === 0 ? '' : 'odd'} ${index % 3 === 0 ? 'every-third' : ''}`} key={item.food.foodId}>
                <img src={item.food.image || brokenImg} alt={item.food.label} />
                <p className='semi-bold'>{item.food.label}</p>
                {
                  !itemInCart ? 
                  <button className='add-cart-btn' onClick={() => updateCart(item)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      ADD <span className='extra'>TO CART</span>
                    </button>
                    : <QuantityChanger updateCart={updateCart}  changeQuantity={changeQuantity} itemInCart={itemInCart} />
                }
              </div>
            )
          }
          )}
          </div>
        : <img className='no-results-img' src={noResults} alt='no results found' />
      } 
      {nextApi.length > 0 && <button className='view-more' onClick={() => callAPI(getMoreItems, nextApi, 'add')}>View More Items</button>}
    </section>
  )
}

SearchResults.propTypes = {
  searchParams: PropTypes.object.isRequired, 
  cart: PropTypes.array.isRequired, 
  updateCart: PropTypes.func.isRequired, 
  changeQuantity: PropTypes.func.isRequired, 
}

export default SearchResults