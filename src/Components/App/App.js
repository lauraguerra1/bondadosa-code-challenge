import './App.css';
import { useEffect } from 'react';
import { getItem } from '../../utils/apiCalls';
import { NavLink, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Cart from '../Cart/Cart';

function App() {
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
        <h1 id='title'>VIRTUAL GROCER</h1>
        <nav>
          <NavLink to='/cart'>CART</NavLink>
        </nav>
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
