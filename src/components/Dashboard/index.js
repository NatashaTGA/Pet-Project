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
        <>  
            <div>
                <input placeholder='Search CryptoCurrency'
                onChange={(event) => setSearch(event.target.value)}
                />
            </div>
            <table className='table-auto'>
            <thead>
                <tr>
                <th>Coin</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>Market Cap</th>
                </tr>
            </thead>
            <tbody>
                {handleSearch().map((coin) => {
                    const profit = coin.market_data.price_change_percentage_24h > 0;
                    return (
                        <tr key={coin.name} className='mb-5'>
                        <Link to={`/coins/${coin.id}`}>
                            <td>{coin.name}<td className='uppercase'>{coin.symbol}<img src={coin.image.thumb} alt="crypto_icon"/></td></td>
                        </Link>
                        <td>{symbol}{''}{coin.market_data.current_price[currentCurrency]}</td>
                        <td style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red"}}>{profit && "+"}{coin.market_data.price_change_percentage_24h}{'%'}</td>
                        <td>{symbol}{''}{coin.market_data.market_cap[currentCurrency]}</td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
        </>
    );
}

export default Dashboard;