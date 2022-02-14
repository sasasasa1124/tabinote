import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import PostIndex from './PostIndex';

const UserShow = () => {
    const [user,setUser] = useState({name:"Anonymous",id:0});
    const [posts,setPosts] = useState([]);
    const [center,setCenter] = useState();
    const { id } = useParams();

    useEffect(() => {
        fetchUser(id);
    },[])

    return (
        <div>
            <h1>{user.name}'s Posts</h1>
            <PostIndex
            defaultCenter={center}
            user={user}
            posts={posts}
            ></PostIndex>
        </div>

    );

    function fetchUser() {
        axios.get(`/users/fetch/${id}`)
            .then((res) => {
                console.log(res.data);
                setUser(res.data.user);
                setPosts(res.data.posts);
                let lat = 0.0;
                let lng = 0.0;
                let len = 0;
                res.data.posts.map((post)=>{
                    lat += Number(post.lat);
                    lng += Number(post.lng);
                    len += 1;
                });
                const tmp = ({lat: Number(String(lat/len).slice(0,15)), lng: Number(String(lng/len).slice(0,15))});
                setCenter(tmp);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default UserShow;