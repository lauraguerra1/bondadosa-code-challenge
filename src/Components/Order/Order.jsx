import React, { useState } from 'react'
import PropTypes from 'prop-types';
import './Order.css'
import { useParams } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';

const Order = ({ openOrCloseCart, cart, cartTotal }) => {

  const [order, setOrder] = useState({
    orderId: useParams().orderId,
    cart: cart,
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    payment: 'cash'
  });
  
  const handleChange = (e) => {
    setOrder(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  return (
    <div className='order-page'>
      <h2>Checkout</h2>
      <div className='order'> 
        <form>
          {Object.keys(order).reduce((elements, name, i) => {
            if (!i) elements.push(<h3 className='text-lg font-semibold section-title'>SHIPPING DETAILS</h3>)
            if (name !== 'orderId' && name !== 'cart') {
              if (name === 'payment') elements.push(<h3 className='text-lg font-semibold section-title'>PAYMENT DETAILS</h3>)
              elements.push(
                <div id={`${name}Container`} className='form-element'>
                  <label className='font-semibold text-sm' htmlFor={name}>{name === 'zipCode' ? 'ZIP CODE' : name === 'address' ? 'STREET ADDRESS' : name === 'payment' ? 'PAYMENT TYPE' : name.toUpperCase()}</label> 
                  {name !== 'payment'
                    ? <input id={name} type='text' name={name} onChange={handleChange} value={order[name]} required />
                    : <select id={name} name={name} onChange={handleChange} value={order[name]} required>
                        <option value='cash'>CASH</option>
                        <option value='WIC'>WIC</option>
                        <option value='SNAP'>SNAP</option>
                      </select>
                  }
                </div>
              )
            }
            return elements
          }, [])}
          <button className='form-element purchase-btn text-lg font-semibold'>PURCHASE ITEMS</button>
        </form>
        <div className='order-info'>
          <div className='flex section-title'>
            <h3 className='text-lg font-semibold'>YOUR ORDER</h3>
            <button className='text-sm font-semibold clear-btn' onClick={() => openOrCloseCart(true)}>EDIT CART</button>
          </div>
          <div className='cart-summary'>
            {cart.map(item => <CartItem key={item.food.foodId} item={item} />)}
          </div>
          <div className='flex cart-total'>
            <p>TOTAL:</p><p aria-description='quantity of items in cart'>{cartTotal} ITEMS</p>
          </div>
        </div>
      </div>
    </div>
  )
}

Order.propTypes = {
  cartTotal: PropTypes.number.isRequired,
  openOrCloseCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired
}

export default Order