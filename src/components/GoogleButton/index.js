import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

function GoogleButton() {

    const [user, setUser] = useState({});

    function handleCallBackResponse(response) {
        let userObject = jwt_decode(response.credential);
        setUser(userObject);
        document.getElementById('signInDiv').hidden = true;
    }

    function handleSignOut(event) {
        setUser({});
        document.getElementById('signInDiv').hidden = false;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
        client_id: '759329800855-sf8kbm351rs5eiuf1qigu1c9u5uo43af.apps.googleusercontent.com',
        callback: handleCallBackResponse
        });

        google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        { theme: 'outline', size: 'large' }
        );

        google.accounts.id.prompt();
    }, [])
    
    return (
        <div className='flex justify-between p-5 bg-neutral-300'>
            <div id='signInDiv'></div>
            { user && (
                <div className='flex justify-between'>
                    <img className='h-8 pr-2 items-center' src={user.picture}></img>
                    <h3>{user.name}</h3>
                </div>
            )}
            { Object.keys(user).length != 0 && (
                <button 
                    className='hover:text-yellow-500 cursor-pointer' 
                    onClick={(event) => handleSignOut(event)}>
                        Sign out
                    </button>
            )}
        </div>
    );
}

export default GoogleButton;