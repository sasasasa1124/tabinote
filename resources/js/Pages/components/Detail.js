import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import PostShow from './PostShow';

const Detail = () => {
    const [post,setPost] = useState({});
    const [author,setAuthor] = useState({});
    const [comments,setComments] = useState([]);
    const [user,setUser] = useState({});
    const [images,setImages] = useState();
    const { id } = useParams();

    useEffect(() => {
        fetchPost(id);
        fetchUser();
        fetchLocation();
    },[])

    return (
        <div>
            <PostShow
            post={post}
            author={author}
            images={images}
            user={user}
            location={location}
            comments={comments}
            ></PostShow>    
        </div>

    );

    function fetchPost() {
        axios.get(`/posts/fetch/${id}`)
            .then((res) => {
                setPost(res.data.post);
                setAuthor(res.data.author);
                setComments(res.data.comments);
                if (res.data.images !== undefined) {
                    setImages(res.data.images);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

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
}

export default Detail;