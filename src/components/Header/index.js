import React from 'react';
import { useNavigate } from "react-router-dom";
import { CryptoState } from '../../CryptoContext';

const Header = () => {
    const navigate = useNavigate();
    const { currency, setCurrency } = CryptoState();

    return (
    <div className='flex justify-between pr-5 pl-5 bg-neutral-700'>
        <div className='container flex items-center h-20' 
            onClick={() => navigate(`/`)}
            style={titleStyle}>
            Crypto App
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

const titleStyle = {
    flex: '1',
    color: 'rgb(225, 174, 6)',
    fontSize: '7vh',
    fontWeight: 'bold'
}

export default Header;