import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostIndex from './PostIndex';
import {
    Container
} from 'react-bootstrap';

const Private = () => {
    const [location,setLocation] = useState({})
    const [user,setUser] = useState({id: 0, name:'Anonymous'}); 
    const [posts, setPosts] = useState([]);

    useEffect(() => {        
        fetchLocation();
        fetchUser();
    },[]);

    useEffect(() => {
        fetchPosts();
    },[user]);

    return (
        <Container>
            <PostIndex
            defaultCenter={location}
            user={user}
            posts={posts}
            location={location}
            ></PostIndex>
        </Container>
    );

    function fetchUser() {
        axios.get('/users/fetch')
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function setPosition(position) {
        setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }

    function fetchLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function handleApiLoaded(object) {
        setMap(object.map);
        setMaps(object.maps);
    }

    function fetchPosts() {
        axios.post('/posts/users/fetch',user)
            .then((res)=>{
                console.log(res.data);
                setPosts(res.data);
            });
    }

    function filterPosts(filters, posts) {
        const filtering = (arr,key,val) => {
            return arr.filter(el => el[key] == val)
        }
        let results = [];
        for (const [key, value] of Object.entries(filters)) {
            console.log(key,value);
            results.push(filtering(posts,key,value));
        }
        console.log(results);
        return results
    }
}

export default Private;