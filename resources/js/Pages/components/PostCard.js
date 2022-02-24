import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';

const PostCard = (props) => {
    const [loading, setLoading] = useState(false);

    return (
        // use the thumbnails to display the images, possiblly using carousel?
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.post.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {new Date(props.post.created_at).toLocaleString()}
                </Typography>
                <Typography variant="body">
                    {props.post.body}
                </Typography>        
            </CardContent>
            <CardActions>
                <a href={'/posts/' + props.post.id}>
                    <Button size="small">detail...</Button>
                </a>
            </CardActions>
        </Card>
    );    
}

export default PostCard;
