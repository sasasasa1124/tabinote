import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardShow from './CardShow';
import CommentForm from './CommentForm';
import CommentIndex from './CommentIndex';

const PostShow = () => {
    const [post,setPost] = useState({});
    const [author,setAuthor] = useState({});
    const [comments,setComments] = useState([]);
    const [user,setUser] = useState({});
    const [images,setImages] = useState();
    const { id } = useParams();

    useEffect(() => {
        fetchPost(id);
        fetchUser();
    },[])

    return (
        <div>
            <CardShow
            post={post}
            author={author}
            images={images}></CardShow>
            <CommentIndex
            comments={comments}
            ></CommentIndex>
            <CommentForm
            post_id={id}
            ></CommentForm>            
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
}

export default PostShow;