import './App.css';
import { useEffect, useState } from 'react';
import { getItem } from '../../utils/apiCalls';
import { NavLink, Routes, Route, Link, useSearchParams } from 'react-router-dom';
import Home from '../Home/Home';
import Cart from '../Cart/Cart';
import SearchBar from '../SearchBar/SearchBar';

function App() {
  const [cart, setCart] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const updateSearchTerm = (value) => setSearchTerm(value);
  const updateSearchParam = (value) => setSearchParams({ q: searchTerm });
  const clearSearch = () => {
    setSearchParams();
    setSearchTerm('');
  };

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
          <SearchBar className={'search-form'} searchTerm={searchTerm} updateSearchTerm={updateSearchTerm} updateSearchParam={updateSearchParam} />
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
        <SearchBar className={'small-screen-search-form'} searchTerm={searchTerm} updateSearchTerm={updateSearchTerm} updateSearchParam={updateSearchParam} />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home clearSearch={clearSearch} />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
