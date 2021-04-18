import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/context';

export default function SingOut() {

    const { value, setValue } = useContext(UserContext);

    const [ user, setUser ] = useState({});

    function singOut () {
        localStorage.clear();
        setValue(null);
    }

    useEffect(() => {
        async function getFetch() {
            const responce =  await fetch(process.env.REACT_APP_USER_GET_PROFILE , {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
            const data = await responce.json();
            await setUser(data);
        }
        getFetch();
    }, [])



    return(
        <div className='singout'>
            <div className='singout_hello'>{`Hello, ${user.name}`}</div>
            <div className='singout_avatar'><img src={user.avatar} alt={user.name}/></div>
            <button className='singout_button' onClick={singOut}>Logout</button>
        </div>
    )
}