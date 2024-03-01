import React from 'react';
import PropTypes from 'prop-types';

import './Cart.css'

const Cart = ({openOrCloseCart, cartOpen}) => {
  return (
    <aside className={`cart ${cartOpen ? 'open' : 'closed'}`}>
      <div className='cart-top'>
        <button  className='close-cart-btn' onClick={openOrCloseCart}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="close-icon icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        <p>Shopping Cart</p>
      </div>
    </aside>
  )
}

Cart.propTypes = {
  openOrCloseCart: PropTypes.func.isRequired,
  cartOpen: PropTypes.bool.isRequired
}

export default Cart