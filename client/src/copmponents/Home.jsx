import { Box, Button, Skeleton } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import result from '../result.json';
import { getPostThunk } from './../store/posts-reducer';
import './Home.css';
import Post from './Post';

export default function Home() {

    const [data, setData] = useState(result)
    let load = false

    const dispatch = useDispatch()
    const { posts, loading } = useSelector(({ posts }) => posts)
    console.log(posts);

    function getNews(str) {
        dispatch(getPostThunk(str))
    }

    // React.useEffect(() => getNews('tass'), [])
    // React.useEffect(() => getNews('tass'), [posts])


    // setTimeout(() => {
    //     // getNews('tass')
    // }, 30000)

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
                        {
                            loading
                                ?

                                <div className="section">
                                    <Box sx={{ pt: 0.5, m: 1, backgroundColor: 'white', borderRadius: '9px', paddingBottom: '50px' }}>
                                        <Skeleton
                                            sx={{ backgroundColor: 'inherit' }}
                                            variant="rectangular"
                                            width={410}
                                            height={390}

                                        />
                                        <Skeleton
                                            width="90%"
                                            sx={{ ml: '20px' }}

                                        />
                                        <Skeleton
                                            width="60%"
                                            sx={{ ml: '20px' }}
                                        />
                                    </Box>
                                    <Box sx={{ pt: 0.5, m: 1, backgroundColor: 'white', borderRadius: '9px', paddingBottom: '50px' }}>
                                        <Skeleton
                                            sx={{ backgroundColor: 'inherit' }}
                                            variant="rectangular"
                                            width={410}
                                            height={390}

                                        />
                                        <Skeleton
                                            width="90%"
                                            sx={{ ml: '20px' }}

                                        />
                                        <Skeleton
                                            width="60%"
                                            sx={{ ml: '20px' }}
                                        />
                                    </Box>
                                    <Box sx={{ pt: 0.5, m: 1, backgroundColor: 'white', borderRadius: '9px', paddingBottom: '50px' }}>
                                        <Skeleton
                                            sx={{ backgroundColor: 'inherit' }}
                                            variant="rectangular"
                                            width={410}
                                            height={390}

                                        />
                                        <Skeleton
                                            width="90%"
                                            sx={{ ml: '20px' }}

                                        />
                                        <Skeleton
                                            width="60%"
                                            sx={{ ml: '20px' }}
                                        />
                                    </Box>
                                </div>
                                :
                                <div className="section">
                                    {posts &&
                                        posts.map((d, index) => (
                                            <Post key={index + d.newspaper} title={d.title} description={d.text}
                                                image={d.image} translit={d.translit} newspaper={d.newspaper} />
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
