import React from 'react';
import Dashboard from '../../components/Dashboard';
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <>
            <div className='flex justify-end pr-5 bg-neutral-500'>
                <Link 
                    to='/dashboard'
                    className='font-bold'
                    >Show more</Link>
            </div>
            <Dashboard simplified/>
        </>
    );
}

export default Home;