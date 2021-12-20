import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Post.css";


export default function Post({ title, description, image,translit }) {
    useEffect(()=>{

    },[])
    let navigate  = useNavigate()

    return (
        <div className="section-block" onClick={navigate("/news" + "/" + translit)}>
            <Link to={`/news/${translit}`} >
                <Card sx={{ maxWidth: 410, height: 458, borderRadius: 2, ml: 1, mr: 1, boxShadow: 'unset' }}
                >
                    <CardActionArea >
                        <CardMedia
                            component="img"
                            height="250"
                            image={image}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div"
                                sx={{ fontSize: 19.2, fontWeight: 600 }}
                            >
                                {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary"
                                sx={{ overflow: 'hidden' }}
                            >
                                {description}
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
