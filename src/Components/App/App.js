import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import Home from '../Home/Home';
import Cart from '../Cart/Cart';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Order from '../Order/Order';
import Confirmation from '../Confirmation/Confirmation';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderId, setOrderId] = useState('');
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setCartTotal(
      cart.reduce((acc, curr) => {
        acc += curr.quantity;
        return acc;
      }, 0)
    );
  }, [cart]);

  useEffect(() => {
    if (!location.pathname.includes('search')) {
      setSearchTerm('');
    }

    if (location.pathname === '/order') navigate('/');
  }, [location.pathname]);

  const openOrCloseCart = (setting = null) => {
    setting === true || setting === false ? setCartOpen(setting) : setCartOpen((prev) => !prev);
  };

  const updateCart = (newItem) => {
    setCart((prev) => {
      if (prev.find((cartItem) => cartItem.food.foodId === newItem.food.foodId)) {
        return prev.filter((cartItem) => cartItem.food.foodId !== newItem.food.foodId);
      } else {
        return [...prev, { ...newItem, quantity: 1 }];
      }
    });
  };

  const changeQuantity = (item, quantity) => {
    setCart((prev) =>
      prev.map((cartItem) => {
        console.log('cartItem', cartItem);
        return cartItem.food.foodId === item.food.foodId ? { ...cartItem, quantity } : cartItem;
      })
    );
  };

  const clearCart = () => setCart([]);

  const updateSearchTerm = (value) => setSearchTerm(value);
  const updateSearchParam = (value) => setSearchParams(value);
  const clearSearch = () => {
    setSearchParams();
    setSearchTerm('');
  };

  const startOrder = (orderId) => setOrderId(orderId);
  const endOrder = () => setOrderId('');

  return (
    <div className='app'>
      <header className={cartOpen ? 'cart-open' : ''}>
        <Link to='/' id='title'>
          VIRTUAL GROCER
        </Link>
        <nav>
          <SearchBar className={'search-form'} searchTerm={searchTerm} updateSearchTerm={updateSearchTerm} updateSearchParam={updateSearchParam} />
          <button onClick={openOrCloseCart} className='cart-btn'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='icon'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z' />
            </svg>
            {cartTotal > 0 && (
              <div className='cartCount'>
                <p aria-label='Cart Quantity'>{cartTotal}</p>
              </div>
            )}
          </button>
        </nav>
        <SearchBar className={'small-screen-search-form'} searchTerm={searchTerm} updateSearchTerm={updateSearchTerm} updateSearchParam={updateSearchParam} />
      </header>
      <main>
        <div className={cartOpen ? 'cart-open' : ''}>
          <Routes>
            <Route path='/' element={<Home clearSearch={clearSearch} />} />
            <Route path='/search' element={<SearchResults searchParams={searchParams} cart={cart} updateCart={updateCart} changeQuantity={changeQuantity} />} />
            <Route path='/order/:orderId' element={<Order orderID={orderId} endOrder={endOrder} cart={cart} openOrCloseCart={openOrCloseCart} cartTotal={cartTotal} clearCart={clearCart} />} />
            <Route path='/order/:orderId/confirmation' element={<Confirmation />} />
          </Routes>
        </div>
        <Cart startOrder={startOrder} openOrCloseCart={openOrCloseCart} cartOpen={cartOpen} cart={cart} updateCart={updateCart} changeQuantity={changeQuantity} cartTotal={cartTotal} />
      </main>
    </div>
  );
}

export default App;
