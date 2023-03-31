import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
   const getCoins = async ()=>{
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    setCoins(response.data)
   }
   getCoins();
  },[]);


  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={(e)=> setSearch(e.target.value)}
            placeholder='Search'
          />
        </form>
      </div>
     {
      filteredCoins.map((coin)=>{
        return <Coin key={coin.id} coin={coin}/>
      })
     }
    </div>
  );
}

export default App;