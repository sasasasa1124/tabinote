import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import {
    FormGroup,
    TextField,
    Checkbox,
    FormControlLabel,
    FormLabel,
    IconButton,
 } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import imageCompression from 'browser-image-compression';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AudioFileIcon from '@mui/icons-material/AudioFile';

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
    const [image, setImage] = useState();
    const [audio, setAudio] = useState();

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
                        onGoogleApiLoaded={handleApiLoaded}
                        ></GoogleMapReact>
                    </div>
                    <FormGroup>
                        <FormLabel>Author: <strong>{user.name}</strong></FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel control={
                            <Checkbox
                            onChange={(e) => setPost({...post, public: (e.target.value == 'on')})} />
                        } label="Public" />
                    </FormGroup>
                    <FormGroup>
                        <TextField
                        label='title'
                        inputProps={{ maxLength: 40 }}
                        valiant='Outlined'
                        onChange={(e) => setPost({...post, title: e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                        <TextField
                        label='body'
                        inputProps={{ maxLength: 40000 }}
                        valiant='Outlined'
                        multiline
                        rows={10}
                        onChange={(e) => setPost({...post, body: e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="image-button-file">
                            <input
                            accept="image/*" 
                            type="file"
                            name="image"
                            id="image-button-file"
                            onChange={handleImageUpload}
                            capture
                            hidden
                            />
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                Photo <PhotoCamera />
                            </IconButton>
                        </label>        
                        <label htmlFor="audio-button-file">
                            <input
                                accept="audio/*" 
                                type="file"
                                name="audio"
                                id='audio-button-file'
                                onChange={handleAudioUpload}
                                capture
                                hidden
                            />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    Audio <AudioFileIcon />
                                </IconButton>
                        </label>
                    </FormGroup>
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

    async function handleImageUpload(event) {
        const imageFile = event.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
      
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
        try {
          const compressedFile = await imageCompression(imageFile, options);
          console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          setImage(compressedFile);
        } catch (error) {
          console.log(error);
        }
    }

    function handleAudioUpload(event) {
        const audioFile = event.target.files[0];
        setAudio(audioFile);
        const url = URL.createObjectURL(audioFile);
        player.src = url;
    }

    async function uploadImage() {
        let data = new FormData();
        data.append('image', image);
        axios.post('/images/create', data, {headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,        
        }})
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err)
        });
    }

    async function uploadAudio() {
        let data = new FormData();
        data.append('audio', audio);
        axios.post('/images/create', data, {headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,        
        }})
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err)
        });
    }

    function handleSubmit(e){
        setLoading(true);
        e.preventDefault();
        axios.post('/posts/create', post)
            .then((res) => {
                uploadImage();
                uploadAudio();
                setLoading(false);
                alert('Your submission has been sent!');
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status == 401) {
                    alert('You need to register to leave comments!');
                }                
            });
    }
}

export default PostForm;


