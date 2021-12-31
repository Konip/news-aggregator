import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import CloseIcon from './CloseIcon';
import './Home.css';
import "./News.css";

export default function News() {

    let location = useLocation()
    let str = location.pathname.split('/')[2]
    const [data, setData] = useState()

    const { posts, loading } = useSelector(({ posts }) => posts)
    // console.log(posts);

    React.useEffect(() => {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].translit === str) {
                setData(posts[i])
                let news = document.querySelector('.news-text')
                let text= posts[i].text
                var parser = new DOMParser().parseFromString(text, "text/html").body.getElementsByTagName('p')
                news.append(...parser)
                break
            }
        }
    }, [])

    return (
        < div className="news">
            <div className="Layout-container">

                <div className="news-container">
                    <Link to={'/'}>
                        <CloseIcon />
                    </Link>
                    <div className="news-content">
                        <div className="news-title">
                            {data && data.title}
                        </div>
                        <img className="news-img" src={data && data.image} />
                        <div className="news-text">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
