import React from 'react';
import { CryptoState } from "../../CryptoContext";
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { useGetCryptoDetailsQuery } from '../../services/cryptoApi';
import Charts from '../../components/Charts';

const Coin = () => {

    const { id } = useParams();
    const { symbol, currentCurrency } = CryptoState();
    const { data, isFetching } = useGetCryptoDetailsQuery(id);
    
    if(isFetching) return 'Loading...'
    
    const profit = data.market_data.price_change_percentage_24h > 0;

    return (
        <div className='flex justify-between'>
            <div className='border-r-2 w-1/3'>
                <img 
                    src={data.image.large} 
                    alt={data.name}
                    className='my-1'
                ></img>
                <h1>{data.name}</h1>
                <p>{data.symbol}</p>
                <p>{HTMLReactParser(data.description.en.split('. ')[0])}</p>
                <h2>Rank: <p>{data.coingecko_rank}</p></h2>
                <h2>Current price: <p>{symbol}{''}{data.market_data.current_price[currentCurrency]}</p></h2>
                <h2>Market Cup: <p>{symbol}{''}{data.market_data.market_cap[currentCurrency]}</p></h2>
                <h2>24h Change: 
                    <p 
                    style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red"}}>
                        {profit && "+"}{data.market_data.price_change_percentage_24h}{'%'}
                    </p>
                </h2>
                <a href={data.links.official_forum_url[0]}>{data.links.official_forum_url[0]}</a>
            </div>
            <div className='w-8/12'>
                <Charts data={data} id={id} isFetching={isFetching}/>
            </div>
        </div>
    );
}

export default Coin;