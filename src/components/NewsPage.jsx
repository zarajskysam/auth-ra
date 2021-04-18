import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/context';
import { nanoid } from 'nanoid';

export default function NewsPage() {

    const [ news, setNews ] = useState([]);

    const { value } = useContext(UserContext);

    useEffect(() => {
        async function getFetch() {
            const responce =  await fetch(process.env.REACT_APP_USER_GET_NEWS, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
            const data = await responce.json();
            await setNews(data);
        }
        getFetch();
    }, [])
 
    return(
        <div className='news'>
        {news.map(item => (
            <div className='news_item' key={ nanoid() }>
                <div className='news_item_img'><img src={item.image}/></div>
                <h3 className='news_item_title'>{item.title}</h3>
                <div className='news_item_content'>{item.content}</div>
            </div>
        ))}
        </div>
    )
} 