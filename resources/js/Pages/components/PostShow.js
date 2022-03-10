import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import CardShow from './CardShow';
import CommentForm from './CommentForm';
import CommentIndex from './CommentIndex';

const PostShow = (props) => {
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

      const post = props.post;
      const author = props.author;
      const images = props.images;
      const user = props.user;
      const currentLocation = props.location;
      const comments = props.comments;
      const distance = getDistanceFromLatLonInKm(currentLocation.lat, currentLocation.lng, post.lat, post.lng);


    return (
        <div>
            {(distance < 4.0 || post.user_id == user.id)
            ?
            (
                <div>
                    <CardShow
                    post={post}
                    author={author}
                    images={images}
                    user={user}
                    location={currentLocation}
                    ></CardShow>
                    <CommentIndex
                    comments={comments}
                    ></CommentIndex>
                    <CommentForm
                    post_id={post.id}
                    ></CommentForm>
                </div>
            )
            :
            (
                <div>
                    <p>You can't view this post!</p>
                    <p>You must be author of the post, or be within 4km from the post location!</p>
                </div>
            )}
        </div>
    ); 
}

export default PostShow;