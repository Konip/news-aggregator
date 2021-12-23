import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import result from '../result.json';
import { getPostThunk } from './../store/posts-reducer';
import './Home.css';
import Post from './Post';

export default function Home() {

    const [data, setData] = useState(result)

    const dispatch = useDispatch()
    const { posts, loading } = useSelector(({ posts }) => posts)
    console.log(posts);

    function getNews(str) {
        dispatch(getPostThunk(str))
    }

    React.useEffect(() => getNews('tass'), [])


    return (
        <div className="Layout-container">
            <div className='header'>
                {/* <button onClick={() => changeNews('riaNews')}>Ria</button> */}
                <Button variant="outlined" onClick={() => getNews('rt')}>Rt</Button>
                <Button variant="outlined" onClick={() => getNews('tass')}>Tass</Button>
                <Button variant="outlined" onClick={() => getNews('ria')}>Ria</Button>
            </div>
            <div className='Layout-content'>
                <div className="grid-root">
                    <div className="grid-container">
                        <div className="section">
                            {posts &&
                                posts.map((d, index) => (
                                    <Post key={index} title={d.title} description={d.text}
                                        image={d.image} translit={d.translit} newspaper={d.newspaper} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
