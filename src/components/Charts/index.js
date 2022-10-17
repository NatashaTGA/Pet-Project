import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CryptoState } from "../../CryptoContext";
import { useGetCryptoHistoryQuery } from '../../services/cryptoApi';
import { chartDays } from '../../config/data';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const Charts = ({ id }) => {

    const { currentCurrency } = CryptoState();
    const [days, setDays] = useState(1);
    const { data: coinHistory, isFetching } = useGetCryptoHistoryQuery({ id, currentCurrency, days });

    if(isFetching) return 'Loading...'

    const labels = coinHistory.prices.map((coin) => {
        let date = new Date(coin[0]);
        let time =
            date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`;
            
    return days === 1 ? time : date.toLocaleDateString();
    });

    const options = {
        responsive: true,
        elements: {
            point: {
                radius: 1,
            },
        }
    }

    const chartsData = {
        labels,
        datasets: [
            {
            data: coinHistory.prices.map((coin) => coin[1]),
            label: `Price ( Past ${days} Days ) in ${currentCurrency}`,
            borderColor: "#EEBC1D",
            },
        ],
    }

    return (
        <div>
            <div className='w-full'>
                <Line options={options} data={chartsData} className='w-full' />
            </div>
            <div className='flex justify-between pl-5 mt-14'>
                {chartDays.map((day) => (
                    <button
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                    className='w-32 h-9 bg-yellow-500 rounded cursor hover:bg-yellow-600'>
                        {day.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Charts