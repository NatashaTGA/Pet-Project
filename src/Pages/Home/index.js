import React from 'react';
import Dashboard from '../../components/Dashboard';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { Link } from "react-router-dom";

const Home = () => {
    const { data, isFetching } = useGetCryptosQuery(10);

    return (
        <>
            <div className='flex justify-end'>
                <Link to='/dashboard'>Show more</Link>
            </div>
            <Dashboard simplified/>
        </>
    );
}

export default Home;