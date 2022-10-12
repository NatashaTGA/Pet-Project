import React from 'react';
import { useNavigate } from "react-router-dom";
import { CryptoState } from '../../CryptoContext';

const Header = () => {
    const navigate = useNavigate();
    const { currency, setCurrency } = CryptoState();

    return (
    <div className='flex m-5 justify-between'>
        <div className='container' 
            onClick={() => navigate(`/`)}
            style={titleStyle}>
            Crypto App
        </div>
        <div className='w-28 flex justify-end'>
            <select 
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
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