import './App.css';
import { useEffect, useState } from 'react';
import { getItem } from '../../utils/apiCalls';
import { NavLink, Routes, Route, Link } from 'react-router-dom';
import Home from '../Home/Home';
import Cart from '../Cart/Cart';

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const callAPI = async () => {
      try {
        const data = await getItem('pasta');
        console.log('testing api', data);
      } catch (error) {
        console.log(error);
      }
    };

    // callAPI();
  });

  return (
    <div className='app'>
      <header>
        <Link to='/' id='title'>
          VIRTUAL GROCER
        </Link>
        <nav>
          <form className='search-form'>
            <input type='search' placeholder='Search for grocery items' />
            <button className='search-btn'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='icon'>
                <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
              </svg>
            </button>
          </form>
          <NavLink to='/cart' className='cart-btn'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='icon'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z' />
            </svg>
            {cart.length > 0 && (
              <div class='cartCount'>
                <p aria-label='Cart Quantity'>{cart.length}</p>
              </div>
            )}
          </NavLink>
        </nav>
        <form className='small-screen-search-form'>
          <input type='search' placeholder='Search for grocery items' />
          <button className='search-btn'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='icon'>
              <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
            </svg>
          </button>
        </form>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
