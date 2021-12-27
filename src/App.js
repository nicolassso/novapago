import React, { useEffect, useState } from 'react';
import './App.css';

import axios from 'axios'



function App() {

  const [coin, setCoin] = useState({})
  const url = 'https://api.coincap.io/v2/assets/bitcoin'



  useEffect(() => {
    const getData = async() => {
      await axios.get(url)
      .then(res=>{
        setCoin(res.data.data)
        console.log(res.data.data)
      })
    }
    getData()
  }, [])

  return (
    <div className="App">
      <div className="header">
        <h1>Coin: {coin.name}</h1>
        <h3>Symbol: {coin.symbol}</h3>
        <h2>Price: $ {coin.priceUsd}</h2>
      </div>
    </div>
  );
}

export default App;
