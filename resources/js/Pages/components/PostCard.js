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
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }

      const currentLocation = props.location;
      const post = props.post;
      const user = props.user;
      const distance = getDistanceFromLatLonInKm(currentLocation.lat, currentLocation.lng, post.lat, post.lng);

    return (
        // use the thumbnails to display the images, possiblly using carousel?
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.post.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {new Date(post.created_at).toLocaleString()}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {distance} km from your location
                </Typography>
            </CardContent>
            <CardActions>
                {
                    (distance < 4.0 || post.user_id == user.id || post.public == true)
                    ?
                        (<a href={'/posts/' + post.id}>
                            <Button size="small">detail...</Button>
                        </a>)                    
                    :
                        (<p>you need to get closer to see detail...</p>)
                }
            </CardActions>
        </Card>
    );    
}

export default PostCard;
