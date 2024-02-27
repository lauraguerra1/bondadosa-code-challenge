import './App.css';
import { useEffect } from 'react';
import { getItem } from '../../utils/apiCalls';
import { NavLink } from 'react-router-dom';

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
        <h1>GROCERY STORE</h1>
        <nav>
          <NavLink to='/cart'>CART</NavLink>
        </nav>
      </header>
      <main></main>
    </div>
  );
}

export default App;
