import React, { useState, useContext } from 'react';
import { UserContext } from '../context/context';


const DEFAULT_LOGIN_FORM = {
    login: 'User',
    password: 'password'
}

export default function LoginForm(props) {

    const {value, setValue} = useContext(UserContext);

    const [ form, setForm ] = useState(DEFAULT_LOGIN_FORM);
    const [ error, setError ] = useState(false);


    function handleChange(e) {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    async function submitForm() {
        let response = await fetch(process.env.REACT_APP_USER_LOGIN , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(form)
        })
        if (!response.ok) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 2000);
            return;
        }
        let res = await response.json();
        localStorage.setItem('token', res.token);
        setValue(localStorage);
    }
    
    return(
        <div className='singin'>
            <input className='singin_input' name='login' placeholder='Login' onChange={handleChange} />
            <input className='singin_input' name='password' type='password' placeholder='Password' onChange={handleChange} />
            <button className='singin_submit' onClick={submitForm}>Sing In</button>
            {error ? <div className='singin_error'>Пользователь не найден</div> : null}
        </div>
    )
}