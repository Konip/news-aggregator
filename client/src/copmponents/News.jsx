import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import result from '../result.json';
import './Home.css';
import ne from './ne.json';
import "./News.css";

export default function News({ }) {

    let location = useLocation()
    let str = location.pathname.split('/')[2]
    console.log(str)
    const [data, setData] = useState(ne)
    React.useEffect(() => {
        for (let i = 0; i < result.length; i++) {
            if (result[i].translit === str) {
                setData(result[i])
                break
            }
        }
    }, [])
    console.log(data);

    return (
        < div className="news">
            <div className="Layout-container">
                <div className="news-container">
                    <div className="news-content">
                        <div className="news-title">
                            {data.title}
                        </div>
                        <img className="news-img" src={data.image} />
                        <div className="news-text">
                            {data.text}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
