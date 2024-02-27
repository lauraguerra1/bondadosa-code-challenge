import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { getItem } from './utils/apiCalls';

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

    callAPI();
  });

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
