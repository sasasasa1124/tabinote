import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PostIndex from './PostIndex';
import {
    Container
} from 'react-bootstrap';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Home = () => {
    const [location,setLocation] = useState({})
    const [user,setUser] = useState({id: 0, name:'Anonymous'}); 
    const [map, setMap] = useState(null);
    const [maps, setMaps] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    // adding filters to interactively serach the posts; users, location, genre?
    const [filters, setFilters] = useState({});
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
            <FormGroup>
                <FormControlLabel control={<Checkbox onChange={(e) => setFilters({...filters, public: !(filters.public)})} />} label="Private only" />
            </FormGroup>            
            <PostIndex
            defaultCenter={location}
            user={user}
            posts={filterdPosts}
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
            results.push(filtering(posts,key,value));
        }
        console.log(results);
        return results
    }
}

export default Home;