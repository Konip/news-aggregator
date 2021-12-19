import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import "./Post.css";

const st = {

}

export default function Post({ title, description, image }) {
    return (
        <div className="section-block">
            <Card sx={{ maxWidth: 410, height: 458, borderRadius: 2, ml: 1, mr: 1, boxShadow: 'unset' }}>
                <CardActionArea>
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
                        sx={{overflow:'hidden'}}
                        >
                         {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
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
