import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import {
    FormGroup,
    TextField,
    Checkbox,
    FormControlLabel,
    FormLabel,
 } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

const PostForm = () => {
    const [user,setUser] = useState({id: 0, name:'Anonymous'});
    const [location, setLocation] = useState({lat: '',lng: ''});
    const [post,setPost] = useState({
        user_id: 0,
        title: '',
        public: false,
        lat: '',
        lng: '',
        body: '',
    });
    const [map, setMap] = useState(null);
    const [maps, setMaps] = useState(null);
    const [marker, setMarker] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {        
        fetchLocation();
        fetchUser();
    },[]);

    useEffect(() => {
        setPost({...post, user_id: user.id})
    },[user]);

    useEffect(() =>{
        setPost({...post, lat: location.lat, lng: location.lng})
    },[location]);

    return (
        <div>
            <form
            method='POST'
            onSubmit={handleSubmit}
            encType="multipart/form-data">
                <FormGroup onSubmit={handleSubmit}>
                    <div style={{ height: '40vh', width: '100%' }}>
                        <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.MIX_GOOGLE_API }}
                        center={location}
                        defaultZoom={15}
                        onClick={setLatLng}
                        onGoogleApiLoaded={handleApiLoaded}
                        ></GoogleMapReact>
                    </div>
                    <FormLabel>Author: <strong>{user.name}</strong></FormLabel>
                    <FormControlLabel control={
                        <Checkbox
                        onChange={(e) => setPost({...post, public: (e.target.value == 'on')})} />
                    } label="Public" />
                    <TextField
                    label='title'
                    valiant='Outlined'
                    onChange={(e) => setPost({...post, title: e.target.value})} />
                    <TextField
                    label='body'
                    valiant='Outlined'
                    multiline
                    onChange={(e) => setPost({...post, body: e.target.value})} />
                    <input
                        accept="image/*" 
                        type="file"
                    />
                </FormGroup>
                <LoadingButton
                    onClick={handleSubmit}
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                >
                    Send
                </LoadingButton>            
            </form>
        </div>

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
        // axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.MIX_GOOGLE_API}`)
        //     .then((res)=>{
        //         console.log(res.data);
        //         setAddress(res.data);
        //     })
        
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
        setMarker(new maps.Marker({
            map,
            position: location,
        }));
    }; 

    function setLatLng({ x, y, lat, lng, event }){
        if (marker) {
          marker.setMap(null);
        }
        setLocation({lat:lat,lng:lng});
        setPost({...post,lat:lat,lng:lng});
        setMarker(new maps.Marker({
          map,
          position: {lat:lat,lng:lng},
        }));
        map.panTo({lat:lat,lng:lng});
    };

    function handleSubmit(e){
        setLoading(true);
        e.preventDefault();
        axios.post('/posts/create', post)
            .then((res) => {
                setLoading(false);
                alert('Your submission has been sent!');
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default PostForm;


