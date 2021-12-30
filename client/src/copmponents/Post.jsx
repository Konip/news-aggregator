import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Post.css";

export default function Post({ title, image, translit, newspaper, time }) {

    let navigate = useNavigate()

    return (
        <div className="section-block" onClick={() => navigate("/news" + "/" + translit)}>
            <Link to={`/news/${translit}`} >
                <Card sx={{ maxWidth: 410, minHeight: 475, borderRadius: 2, boxShadow: 'unset' }}
                >
                    <CardActionArea sx={{
                        maxWidth: 410, minHeight: 'inherit', display: 'flex',
                        flexDirection: 'column', justifyContent: 'start',
                        boxShadow: 'inset 0 0 0 1px #e5e5e5', borderRadius: ' 8px'

                    }}>
                        {/* <CardActionArea sx={{ maxWidth: 410, height: '100%', top: 0 }}> */}
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
                                sx={{ overflow: 'hidden', position: 'absolute', left: '15px', bottom: '15px' }}
                            >
                                {time}
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </div>

    );
}
