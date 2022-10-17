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
        <div className='flex justify-between pr-5 bg-neutral-500'>
            <div className='border-r-2 w-1/3 flex items-center justify-center text-center flex-col'>
                <img 
                    src={data.image.large} 
                    alt={data.name}
                    className='my-1 pt-5'
                ></img>
                <h1 className='font-bold'>{data.name}</h1>
                <p>{data.symbol}</p>
                <p className='pt-5 pb-5'>{HTMLReactParser(data.description.en.split('. ')[0])}</p>
                <h2 className='font-bold pb-2 flex'>Rank: <p>{data.coingecko_rank}</p></h2>
                <h2 className='font-bold pb-2'>Current price: <p>{symbol}{''}{data.market_data.current_price[currentCurrency]}</p></h2>
                <h2 className='font-bold pb-2'>Market Cup: <p>{symbol}{''}{data.market_data.market_cap[currentCurrency]}</p></h2>
                <h2 className='font-bold pb-2'>24h Change: 
                    <p 
                    style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red"}}>
                        {profit && "+"}{data.market_data.price_change_percentage_24h}{'%'}
                    </p>
                </h2>
                <a 
                    className='hover:text-yellow-500' 
                    href={data.links.official_forum_url[0]}>
                        {data.links.official_forum_url[0]}
                </a>
            </div>
            <div className='w-8/12 pt-14 pl-5'>
                <Charts data={data} id={id} isFetching={isFetching}/>
            </div>
        </div>
    );
}

export default Coin;