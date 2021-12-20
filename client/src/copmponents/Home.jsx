import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import result from '../result.json';
import './Home.css';
import Post from './Post';

export default function Home() {

    console.log(process.env.REACT_APP_SERVER_URL);
    const [data, setData] = useState(result)
    const [loading, setLoading] = useState(false)

    // useEffect(() => setData(result), [])

    function getNews(str) {
        setLoading(true)
        axios.get(process.env.REACT_APP_SERVER_URL + str)
            .then(({ data }) => setData(data))
            .finally(setLoading(false))
    }
    let loc = useLocation()
    // setTimeout(() => {
    //     console.log('fetch');
    //     getNews('tass')
    // }, 60000)

    // setTimeout(() => {
    //     console.log('fetch');
    //     getNews('tass')
    // }, 120000)

    return (
        <div className="Layout-container">
            <div className='Layout-header'>
                {/* <button onClick={() => changeNews('riaNews')}>Ria</button> */}
                <Button variant="outlined" onClick={() => getNews('rt')}>Rt</Button>
                <Button variant="outlined" onClick={() => getNews('tass')}>Tass</Button>
            </div>
            <div className='Layout-content'>
                <div className="grid-root">
                    <div className="grid-container">
                        <div className="section">

                            {data &&
                                data.map((d, index) => (
                                    <Post key={index} title={d.title} description={d.text}
                                        image={d.image}  translit={d.translit}/>
                                ))
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
