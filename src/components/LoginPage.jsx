import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SingOut from './SingOut';
import NewsPage from './NewsPage';
import WelcomePage from './WelcomePage';
import {UserContext} from '../context/context';



export default function LoginPage () {

    const [value, setValue] = useState(localStorage.token);

    console.log(value);




    return (
        <UserContext.Provider value={{value, setValue}}>
            <header>
                <div className="logo">Neto Social</div>
                { !value ? <LoginForm /> : <SingOut /> }
            </header>
            <div className='container'>
                <main className='main'>
                { !value ? <WelcomePage /> : <NewsPage/> }
                </main>
            </div>   
        </UserContext.Provider>

    )
}