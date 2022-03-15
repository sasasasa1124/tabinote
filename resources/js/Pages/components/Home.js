import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostIndex from './PostIndex';
import { Container } from '@mui/material';

const Home = () => {
    const [location,setLocation] = useState({})
    const [user,setUser] = useState({id: 0, name:'Anonymous'}); 
    const [posts, setPosts] = useState([]);
    // adding filters to interactively serach the posts; users, location, genre?
    const [filters, setFilters] = useState({
        'public': true,
        });
    const [filterdPosts, setFilteredPosts] = useState([]);

    useEffect(() => {        
        fetchLocation();
        fetchUser();
    },[]);

    useEffect(() => {
        fetchPosts();
    },[user]);

    useEffect(() => {
        setFilteredPosts(posts);
    },[posts]);

    useEffect(() => {
        setFilteredPosts(filterPosts(filters,posts));
    },[filters]);

    return (
        <Container>
            <PostIndex
            defaultCenter={location}
            user={user}
            posts={filterdPosts}
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
        axios.post('/posts/fetch',user)
            .then((res)=>{
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

export default Home;