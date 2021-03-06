import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import PostCard from './PostCard';
import { Container } from '@mui/material';

const PostIndex = (props) => {
    const defaultCenter = props.defaultCenter;
    const user = props.user;
    const posts = props.posts;
    const location = props.location;
    
    return (
        <Container>
            <div style={{ height: '60vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.MIX_GOOGLE_API }}
                    center={defaultCenter}
                    defaultZoom={13}
                >{posts.length >=1 ? posts.map((post) => {
                return (
                    <PostCard
                    post={post}
                    lat={post.lat}
                    lng={post.lng}
                    key={post.id}
                    location={location}
                    user={user}
                    ></PostCard>
                );}): ''}
                </GoogleMapReact>
            </div>
        </Container>
    );
}

export default PostIndex;


