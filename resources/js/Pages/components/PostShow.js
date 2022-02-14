import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CommentForm from './CommentForm';
import CommentIndex from './CommentIndex';


const PostShow = () => {
    const [post,setPost] = useState({});
    const [author,setAuthor] = useState({});
    const [comments,setComments] = useState([]);
    const [user,setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchPost(id);
    },[])

    return (
        <div>
            <Card>
                <CardHeader
                title={post.title}
                subheader={author.name}            
                ></CardHeader>
                <CardContent>
                    <Typography variant="body1" color="text.primary">
                        {post.body}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post.created_at}
                    </Typography>
                </CardContent>
            </Card>
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
                console.log(res.data);
                setPost(res.data.post);
                setAuthor(res.data.author);
                setComments(res.data.comments);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default PostShow;


