import React from 'react';
import PropTypes from 'prop-types';

import './Cart.css'

const Cart = ({openOrCloseCart, cartOpen}) => {
  return (
  <aside className={ `cart ${cartOpen ? 'open' : 'closed'}`}>
      <button onClick={openOrCloseCart}>X</button>
      Cart
    </aside>
  )
}

Cart.propTypes = {
  openOrCloseCart: PropTypes.func.isRequired,
  cartOpen: PropTypes.bool.isRequired
}

export default Cart