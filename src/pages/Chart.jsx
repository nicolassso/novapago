import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import '../components/styles.scss'

//CHART PAGE, BRINGS HISTORY DATA FROM API AND STORES PRICES AND DATES IN SEPARE ARRAYS, LATELY PASSED TO THE CHART COMPONENT TO RENDER THE DATA. USER CAN CHOOSE BETWEEN DAYS AND HOURS. 
//I USED THE CURRENT DATE TO SELECT THE HISTORY DATA, AND SLICED THE DATA ARRAY TO GET THE LAS 30 ITEMS FROM IT


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
    const price = Math.round(location.state.price*100)/100
    const [timeFrame, setTimeFrame] = useState('d1')
    const currentDate = new Date()
    const currentTimeMilliseconds = dayjs(currentDate).valueOf()
    const startDateMilliseconds =  currentTimeMilliseconds - 2505600000


    const getCoinHistory = async (id, timeFrame, currentTime, startDate) => {
        try {
            const res = await axios.get(`https://api.coincap.io/v2/assets/${id}/history?interval=${timeFrame}&start=${startDate}&end=${currentTime}`)
            setCoinHistory(res.data.data.slice(-30))

        } catch (error){
            console.log(error)
        }
    }

    
    const handleChange = (e) => {
        setTimeFrame(e.target.value)
        return timeFrame
    }
    const optionsDropdown = [
        {
            id: 1,
            label: 'Last 30 days',
            value: 'd1'
        },
        {
            id: 2,
            label: 'Last 30 hours',
            value: 'h1'
        }
    ];

    useEffect(() => {
        setCoinId(location.state.coinId)
        if(!coinId) return null;
        getCoinHistory(coinId, timeFrame, currentTimeMilliseconds, startDateMilliseconds)
    }, [coinId, timeFrame, currentTimeMilliseconds, startDateMilliseconds])
    

    //SETUP FOR THE CHART

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
        let hour = ''
        f = new Date(f)
        year = f.getFullYear()
        month = f.getMonth() + 1
        day = f.getDate()
        hour = f.getHours()
        formatDate.push(day+'/'+month+'/'+year+' '+hour+':00')
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
                <h1 className="mt-5">{symbol}: ${price}</h1>

                <div className="dropdown-inner mt-4 mb-3">
                    <select 
                    name="dropdown" 
                    className="dropdown-box"
                    onChange={handleChange}
                    >
                        {optionsDropdown.map(option => (
                            <option key={option.id} value={option.value}>{option.label}</option>
                        ))}

                    </select>
                </div>

                <Line data={data} options={options} />
            </div>
        </div>
        
    )

}

export default Chart