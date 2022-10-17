import React, { useState } from 'react';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { CryptoState } from "../../CryptoContext";
import { Link } from "react-router-dom";

const Dashboard = ({ simplified }) => {

    const count = simplified ? 10 : 100;

    const { data, isFetching } = useGetCryptosQuery(count);
    const { symbol, currentCurrency } = CryptoState();
    const [search, setSearch] = useState('');
    
    const handleSearch = () => {
        return data.filter(
            (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
    };

    if(isFetching) return 'Loading...'

    return (
        <div className='pr-5 pl-5 bg-neutral-500'>  
            <div className='pb-6'>
                <input 
                    placeholder='Search...'
                    onChange={(event) => setSearch(event.target.value)}
                    className='bg-neutral-300 border-2 w-64 border-slate-800 rounded-lg p-0.5'
                />
            </div>
            <table className='table-auto w-full'>
            <thead>
                <tr>
                <th>Coin</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>Market Cap</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {handleSearch().map((coin) => {
                    const profit = coin.market_data.price_change_percentage_24h > 0;
                    return (
                        <tr key={coin.name} className='h-24	text-center border-b-2'>
                        <td>{coin.name}<td className='uppercase flex text-start items-center flex-col m-0'>{coin.symbol}<img src={coin.image.thumb} alt="crypto_icon"/></td></td>
                        <td>{symbol}{''}{coin.market_data.current_price[currentCurrency]}</td>
                        <td style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red"}}>{profit && "+"}{coin.market_data.price_change_percentage_24h}{'%'}</td>
                        <td>{symbol}{''}{coin.market_data.market_cap[currentCurrency]}</td>
                        <Link to={`/coins/${coin.id}`}><td className='h-24 flex items-center justify-center text-center hover:text-yellow-500'>For detail...</td></Link>
                        </tr>
                    )
                })}
            </tbody>
            </table>
        </div>
    );
}

export default Dashboard;