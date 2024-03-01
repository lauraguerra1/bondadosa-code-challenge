import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getItem, getMoreItems } from '../../utils/apiCalls';
import './SearchResults.css'
import brokenImg from '../../images/broken-img.png';

const SearchResults = ({ searchParams, cart, updateCart, changeQuantity }) => {
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
    setNextApi('');
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
                : 
                  <div className='add-cart-btn change-cart-div' >
                    <button className='change-btn' onClick={() => itemInCart.quantity === 1? updateCart(item) : changeQuantity(itemInCart, itemInCart.quantity - 1)}>
                      { itemInCart.quantity === 1? 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      : 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                      }
                    </button>
                    <p>{itemInCart.quantity} ct</p>
                    <button className='change-btn' onClick={() => changeQuantity(itemInCart, itemInCart.quantity + 1)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>

                  </div> 
              }
            </div>
          )
        }
        )}
      </div>
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