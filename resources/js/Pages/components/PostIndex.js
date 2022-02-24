import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import PostCard from './PostCard';
import { Container } from 'react-bootstrap';

const PostIndex = (props) => {
    const defaultCenter = props.defaultCenter;
    const user = props.user;
    const posts = props.posts;
    
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
                    ></PostCard>
                );}): ''}
                </GoogleMapReact>
            </div>
        </Container>
    );
}

export default PostIndex;


