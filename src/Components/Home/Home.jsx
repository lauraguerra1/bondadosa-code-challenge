import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = ({ clearSearch }) => {
  
  useEffect(() => { 
    clearSearch();
  }, [])
  
  return (
    <div className='home'>
      <article className='home-intro'>
        <h1 className='text-center bolder margin-sm'>Welcome to Virtual Grocer!</h1>
        <p className='text-lg text-center'>Your Virtual Grocery Shopping Experience</p>
        <p className='text-center'>Welcome to the future of grocery shopping! At Virtual Grocer, we've crafted a seamless and enjoyable experience to make your digital grocery purchases a breeze.</p>

        <h2 className='semi-bold'>Why Virtual Grocer?</h2>
        <ul>
          <li><span className='semi-bold'>Convenience at Your Fingertips</span>: Browse, search, and add items to your cart effortlessly.</li>
          <li><span className='semi-bold'>Extensive Product Catalog</span>: Explore a vast selection of quality products from the <a target='_blank' href='https://developer.edamam.com/food-database-api'>Edamam Food Database.</a></li>
          <li><span className='semi-bold'>Fast and User-Friendly</span>: Experience a smooth and intuitive interface for a hassle-free shopping journey.</li>
        </ul>

        <h2 className='semi-bold'>Getting Started</h2>
        <ul>
          <li><span className='semi-bold'>🔍 Search Products</span>: Use our powerful search functionality to find your favorite items.</li>
          <li><span className='semi-bold'>🛒 Build Your Cart</span>: Add products to your cart with a simple click.</li>
          <li><span className='semi-bold'>🛍️ Checkout</span>: Try our purchase feature to see how seamless your shopping experience can be.</li>
        </ul>

        <p className='text-center text-md italic'>Ready to get started? Dive into the world of Virtual Grocer now!</p>
      </article>
    </div>
  )
}

Home.propTypes = {
  clearSearch: PropTypes.func.isRequired,
};
export default Home