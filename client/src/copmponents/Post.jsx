import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Post.css";

export default function Post({ title, image, translit, newspaper,time }) {

    let navigate = useNavigate()
    console.log(translit);
    return (
        <div className="section-block" onClick={() => navigate("/news" + "/" + translit)}>
            <Link to={`/news/${translit}`} >
                <Card sx={{ maxWidth: 410, minHeight: 475, borderRadius: 2, ml: 1, mr: 1, boxShadow: 'unset' }}
                >
                    {/* <CardActionArea sx={{ maxWidth: 410, height: 458, top: 0 }}> */}
                    <CardActionArea sx={{ maxWidth: 410, height: '100%', top: 0 }}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={image}
                            alt=""
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div"
                                sx={{ fontSize: 19.2, fontWeight: 600, paddingBottom: 4 }}
                            >
                                <div className="newspaper">
                                    {newspaper}
                                </div>
                                {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary"
                                sx={{ overflow: 'hidden' }}
                            >
                                {time}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </div>

    );

    // return (
    //     <div className='post'>
    //         <div className="post__image" style={{ backgroundImage: `url(${image})` }}></div>
    //         <div className="post__info">
    //             <h2 className="post__title">{title}</h2>
    //             <p className="post__description">{description}</p> 
    //         </div>

    //     </div>
    // )
}
