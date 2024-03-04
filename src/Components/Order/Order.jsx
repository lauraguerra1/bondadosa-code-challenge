import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import './Order.css'
import { useNavigate, useParams } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import NotFound from '../NotFound.jsx/NotFound';

const Order = ({ openOrCloseCart, cart, cartTotal, clearCart, endOrder, orderID }) => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const orderPlaced = localStorage.getItem(orderId);
    if (orderPlaced) {
      navigate(`/order/${orderId}/confirmation`);
    } 
  }, [orderId])

  const [order, setOrder] = useState({
    orderId,
    cart: cart,
    total: cartTotal,
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

  const purchaseOrder = (e) => {
    e.preventDefault();
    localStorage.setItem(orderId, JSON.stringify(order));
    navigate(`/order/${orderId}/confirmation`);
    clearCart();
    endOrder();
  }

  if (orderID !== orderId) {
    return <NotFound orderId={orderId} />
  }

  return (
    <div className='order-page'>
      <h2>Checkout</h2>
      <div className='order'> 
        <form onSubmit={purchaseOrder} >
          {Object.keys(order).reduce((elements, name, i) => {
            if (!i) elements.push(<h3 key='shipping-title' className='text-lg semi-bold section-title'>SHIPPING DETAILS</h3>)
            if (name === 'payment') elements.push(<h3 key='payment-title' className='text-lg semi-bold section-title'>PAYMENT DETAILS</h3>)
            if (['orderId', 'cart', 'total'].every(title => name !== title)) {
              elements.push(
                <div key={`${name}FormElement`} id={`${name}Container`} className='form-element'>
                  <label className='semi-bold text-sm' htmlFor={name}>{name === 'zipCode' ? 'ZIP CODE' : name === 'address' ? 'STREET ADDRESS' : name === 'payment' ? 'PAYMENT TYPE' : name.toUpperCase()}</label> 
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
          <button className='form-element purchase-btn text-lg semi-bold'>PURCHASE ITEMS</button>
        </form>
        <div className='order-info'>
          <div className='flex section-title'>
            <h3 className='text-lg semi-bold'>YOUR ORDER</h3>
            <button className='text-sm semi-bold clear-btn' onClick={() => openOrCloseCart(true)}>EDIT CART</button>
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
  endOrder: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  orderID: PropTypes.string.isRequired
}

export default Order