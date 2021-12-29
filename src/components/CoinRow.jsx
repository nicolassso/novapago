import React from "react";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

const CoinRow = ({ coin, index }) => {
    const history = useHistory()
    const handleClick= () => {
        history.push('/chart', {
                coinId: coin.id
            }
        )
    }
  return (

        <tr onClick={()=>handleClick()}>
        <td className="text-muted">{index}</td>
        <td>
            <span>{coin.name}</span>
            <span className="ms-3 text-muted">{coin.symbol}</span>
        </td>

        <td>${coin.priceUsd}</td>

        <td
            className={
            coin.changePercent24Hr > 0 ? "text-success" : "text-danger"
            }
        >
            {coin.changePercent24Hr}
        </td>

        <td>
            ${coin.volumeUsd24Hr}
        </td>
        </tr>
  );
};

export default withRouter(CoinRow);