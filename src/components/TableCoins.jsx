import React from "react";
import CoinRow from "./CoinRow";

const titles = ["#", "Coin", "Price", "24h Change %"];

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
    <table className="table table-dark mt-4 table-hover">
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