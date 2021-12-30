import React from "react";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import './styles.scss'

//RECEIVES DATA FROM TABLECOINS COMPONENT, WHEN ANY OF THE COINS IS CLICKED, IT SENDS DATA TO THE CHART PAGE TO MAKE THE API CALL WITH THE COIN HISTORY PRICES. IT SHOWS THE COIN NAME, SYMBOL, PRICE AND 24HS CHANGE IN PERCENTAGE

const CoinRow = ({ coin, index }) => {
    const history = useHistory()
    const handleClick= () => {
        history.push('/chart', {
                coinId: coin.id,
                name: coin.name,
                symbol: coin.symbol,
                price: coin.priceUsd
            }
        )
    }
    const price = Math.round(coin.priceUsd*100)/100
    const change = Math.round(coin.changePercent24Hr*100)/100


  return (

        <tr onClick={()=>handleClick()} style={{
            cursor: 'pointer'
          }}>
            <td>
                <span>{coin.name}</span>
                <span className="ms-3 text-muted">{coin.symbol}</span>
            </td>

            <td>${price}</td>

            <td
                className={
                change > 0 ? "text-success" : "text-danger"
                }
            >
                {change}%
            </td>
        </tr>
  );
};

export default withRouter(CoinRow);