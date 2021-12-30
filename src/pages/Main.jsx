import React, { useEffect, useState } from 'react';
import '../App';
import axios from 'axios'
import TableCoins from "../components/TableCoins";

//PAGE WITH THE TOP 10 CRYPTOCURRENCIES, SNEDS THE DATA TO TABLECOINS COMPONENT, FROM THE API AND FROM THE SEARCHBAR


function Main() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState("");


const getCoins = async () => {
  try{
    const res = await axios.get('https://api.coincap.io/v2/assets/')
    setCoins(res.data.data)
  } catch (error) {
    console.log(error)
  }
}


useEffect(() => {
  getCoins()
}, [])

  return (
    <div className="container">
    <div className="row d-flex justify-content-center">
      <input
        type="text"
        placeholder="Search a Coin"
        className="form-control bg-dark text-light border-0 mt-4 text-center w-75"
        autoFocus
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableCoins coins={coins} search={search} />
    </div>
  </div>
  );
}

export default Main;
