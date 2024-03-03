import React from 'react';
import PropTypes from 'prop-types';
import './Cart.css'
import CartItem from '../CartItem/CartItem';

const Cart = ({ openOrCloseCart, cartOpen, cart, updateCart, changeQuantity, cartTotal }) => {

  return (
    <aside className={`cart ${cartOpen ? 'open' : 'closed'}`}>
      <div className='cart-top'>
        <button  className='clear-btn' onClick={openOrCloseCart}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        <p>Shopping Cart</p>
        <p>{cartTotal} Item{cartTotal !== 1 ? 's' : ''}</p>
      </div>
      <div className='cart-contents'>
        {cart.map(item => <CartItem key={item.food.foodId} changeQuantity={changeQuantity} updateCart={updateCart} item={item} />)}
      </div>
      <button className='checkout-btn'>CHECKOUT {cartTotal} ITEM{cartTotal !== 1 ? 'S' : ''}</button>
    </aside>
  )
}

Cart.propTypes = {
  openOrCloseCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  changeQuantity: PropTypes.func.isRequired,
  cartOpen: PropTypes.bool.isRequired,
  cart: PropTypes.array.isRequired, 
  cartTotal: PropTypes.number.isRequired
}

export default Cart