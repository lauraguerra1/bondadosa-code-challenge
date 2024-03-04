import React, { useState } from 'react'
import PropTypes from 'prop-types';
import './Order.css'
import { useParams } from 'react-router-dom';

const Order = ({ openOrCloseCart, cart }) => {

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
        <section className='checkout-section'>
          <form>
            <h3 className='text-md font-semibold section-title'>SHIPPING DETAILS</h3>
            <div>
              <label htmlFor='name'>NAME</label> 
              <input id='name' type='text' name='name' onChange={handleChange} value={order.name} />
            </div>
            <div>
              <label htmlFor='address'>Street Address</label> 
              <input id='address' type='text' name='address' onChange={handleChange} value={order.address} />
            </div>
            <div>
              <label htmlFor='city'>City</label> 
              <input id='city' type='text' name='city' onChange={handleChange} value={order.city} />
            </div>
            <div>
              <label htmlFor='state'>State</label> 
              <input id='state' type='text' name='state' onChange={handleChange} value={order.state} />
            </div>
            <div>
              <label htmlFor='zipCode'>Zip Code</label> 
              <input id='zipCode' type='text' name='zipCode' onChange={handleChange} value={order.zipCode} />
            </div>
            <h3 className='text-md font-semibold section-title'>PAYMENT DETAILS</h3>
            <div>
              <label htmlFor='payment'>Payment Type</label>
              <select id='payment' name='payment' onChange={handleChange} value={order.payment}>
                <option value='cash'>CASH</option>
                <option value='WIC'>WIC</option>
                <option value='SNAP'>SNAP</option>
              </select>
            </div>
          </form>
        </section>
        <div className='order-info'>
          <div className='flex section-title'>
            <h3 className='text-md font-semibold'>YOUR ORDER</h3>
            <button className='text-sm font-semibold clear-btn' onClick={() => openOrCloseCart(true)}>EDIT CART</button>
          </div>
        </div>
      </div>
    </div>
  )
}

Order.propTypes = {
  openOrCloseCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired
}

export default Order