import React, { useEffect, useState } from 'react';
import '../App';
import axios from 'axios'
import TableCoins from "../components/TableCoins";


function Main() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState("");


const getCoins = async () => {
  try{
    const res = await axios.get('https://api.coincap.io/v2/assets/')
    setCoins(res.data.data)
    console.log(res.data.data)
  } catch (error) {
    console.log(error)
  }
}


useEffect(() => {
  getCoins()
}, [])

  return (
    <div className="container">
    <div className="row">
      <input
        type="text"
        placeholder="Search a Coin"
        className="form-control bg-dark text-light border-0 mt-4 text-center"
        autoFocus
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableCoins coins={coins} search={search} />
    </div>
  </div>
  );
}

export default Main;
