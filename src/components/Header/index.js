import React from 'react';
import { useNavigate } from "react-router-dom";
import { CryptoState } from '../../CryptoContext';

const Header = () => {
    const navigate = useNavigate();
    const { currency, setCurrency } = CryptoState();

    return (
    <div className='flex justify-between pr-5 pl-5 bg-neutral-700'>
        <div className='container flex items-center h-20' 
            onClick={() => navigate(`/`)}>
                <h1 className='font-bold text-4xl hover:text-yellow-500 cursor-pointer text-yellow-500'>Crypto App</h1>
        </div>
        <div className='w-28 flex justify-end'>
            <select 
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                className='bg-neutral-700'
                >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
            </select>
        </div>
    </div>
    );
}

export default Header;