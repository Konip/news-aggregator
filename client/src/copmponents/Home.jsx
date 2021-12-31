import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostThunk, getPostThunk } from '../store/posts-reducer';
import './Home.css';
import Post from './Post';
import Skeletons from './Skeletons';


export default function Home() {

    const dispatch = useDispatch()
    const { posts, loading } = useSelector(({ posts }) => posts)
    // console.log(posts);

    function getNews(str) {
        dispatch(getPostThunk(str))
    }

    function getAllNews(str) {
        dispatch(getAllPostThunk(str))
    }

    return (
        <div className="Layout-container">
            <div className='header'>
                <Button variant="outlined" onClick={() => getNews('rt')}>Rt</Button>
                <Button variant="outlined" onClick={() => getNews('tass')}>Tass</Button>
                <Button variant="outlined" onClick={() => getNews('ria')}>Ria</Button>
                <Button variant="outlined" onClick={() => getAllNews()}>All</Button>
            </div>
            <div className='Layout-content'>
                <div className="grid-root">
                    <div className="grid-container">
                        {
                            loading
                                ?
                                <div className="section">
                                    <Skeletons />
                                    <Skeletons />
                                    <Skeletons />
                                </div>
                                :
                                <div className="section">
                                    {posts &&
                                        posts.map((d, index) => (
                                            <Post key={index + d.newspaper} title={d.title}
                                                image={d.image} translit={d.translit} newspaper={d.newspaper}
                                                time={d.time}
                                            />
                                        ))
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
