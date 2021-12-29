import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'


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
    const name = location.state.name
    const symbol = location.state.symbol
    const price = location.state.price

    const getCoinHistory = async (id) => {
        try {
            const res = await axios.get(`https://api.coincap.io/v2/assets/${id}/history?interval=d1&start=1638140400000&end=1640732400000`)
            setCoinHistory(res.data.data)
            console.log(dayjs("2021-11-29").valueOf())
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

    var ejePrecios = []
    var historiaFechas = []
    var formatDate = []


    coinHistory.map(c => ejePrecios.push(c.priceUsd))
    coinHistory.map(c => historiaFechas.push(c.date))

    historiaFechas.map(f => {
        let year = ''
        let month = ''
        let day = ''
        f = new Date(f)
        year = f.getFullYear()
        month = f.getMonth() + 1
        day = f.getDate()
        formatDate.push(day+'/'+month+'/'+year)
        return formatDate
    })


    const options = {
        responsive: true,
        fill: true,
        maintainAspectRatio: false,
    }
    const data = {
        datasets: [
            {
                label: name,
                data: ejePrecios,
                tension: 0.2,
                borderColor: "white",
                backgroundColor: 'rgba(75, 100, 192, 0.2)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 75, 0.2)'
            }
        ],
        labels: formatDate
    }
        
    if(!coinId) return null

    return(
        <div style={{
            height: '100vh'
        }} className="chart-container">
            <div className="coin-chart mt-4 p-4 h-75">
                <h1 className="mb-5">{symbol}: ${price}</h1>
                <Line data={data} options={options} />
            </div>
        </div>
        
    )

}

export default Chart