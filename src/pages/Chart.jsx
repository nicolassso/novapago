import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

import { Line } from 'react-chartjs-2';



function Chart() {

    const location = useLocation()
    const [coinId, setCoinId] = useState()
    const [coinHistory, setCoinHistory] = useState([])

    const getCoinHistory = async (id) => {
        try {
            const res = await axios.get(`https://api.coincap.io/v2/assets/${id}/history?interval=d1&start=1518470720000&end=1519516800000`)
            setCoinHistory(res.data.data)
            console.log(res.data.data)
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        setCoinId(location.state.coinId)
        if(!coinId) return null;
        getCoinHistory(coinId)
    }, [coinId])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend, 
        Filler
      );

      
    const [ejeY, setejeY] = useState([1, 0, 3, 4, 9, 5, 1, 4])
    const [labels, setlabels] = useState([10, 20, 30, 40, 50, 60, 40, 50])
    const options = {
        responsive: true,
    }
    const data = {
        datasets: [
            {
                label: coinId,
                data: ejeY,
                tension: 0.2
            }
        ],
        labels
    }
        
    if(!coinId) return null

    return(
        <div className="coin-chart">
            <Line data={data} options={options} />
        </div>
    )

}

export default Chart