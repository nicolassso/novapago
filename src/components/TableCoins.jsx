import React from "react";
import CoinRow from "./CoinRow";
import './styles.scss'


const titles = ["Coin", "Price", "24h Change"];

//RECEIVE THE API DATA AND FILTER THE TOP 10 MARKETCAP COINS, IF THE SEARCH FROM THE SEARCH BAR MATCHES ANY OF THE TOP 10 COINS, THE TABLE ONLY DISPLAYS THESE COINS, IF NOT, IT DISPLAYS THE REST OF MATCHES 

const TableCoins = ({ coins, search }) => {

  const topCoins = coins
  .filter((coin,index) => index < 10)


  const filteredTopCoins = topCoins
  .filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))



  const filteredCoins = coins
  .filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter((coin, index) => index < 10)


  if (!coins) return <div>no coins</div>

  return (
    <table className="table table-striped table-dark mt-4 table-hover">
      <thead>
        <tr>
          {titles.map((title, i) => (
            <td key={i}>{title}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {
          (filteredTopCoins.length === 0) 
          ? filteredCoins
          .map((coin, index) => (
            <CoinRow key={coin.id} coin={coin} index={index + 1} />
          ))
          : filteredTopCoins
          .map((coin, index) => (
            <CoinRow key={coin.id} coin={coin} index={index + 1} />
          ))
        }
      </tbody>
    </table>
  );
};

export default TableCoins;