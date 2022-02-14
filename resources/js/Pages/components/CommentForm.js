import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    FormGroup,
    TextField,
    FormLabel,
 } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const CommentForm = (props) => {
    const [user,setUser] = useState({id: 0, name:'Anonymous'});
    const [comment,setComment] = useState({
        user_id: 0,
        post_id: props.post_id,
        body: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUser();
    },[]);

    useEffect(() => {
        setComment({...comment, user_id: user.id})
    },[user]);

    return (
        <div>
            <FormGroup onSubmit={handleSubmit}>
                <FormLabel>Author: <strong>{user.name == null ? 'Anonymous' : user.name}</strong></FormLabel>
                <TextField
                label='body'
                valiant='Outlined'
                multiline
                onChange={(e) => setComment({...comment, body: e.target.value})} />
            <LoadingButton
                onClick={handleSubmit}
                endIcon={<SendIcon />}
                loadingPosition="end"
                variant="contained"
            >
                Leave Comments
            </LoadingButton>    
            </FormGroup>
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

    function handleSubmit(e){
        setLoading(true);
        e.preventDefault();
        axios.post('/comments/create', comment)
            .then((res) => {
                setLoading(false);
                alert('Your submission has been sent!');
                console.log(res.data);
                history.go(0);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default CommentForm;


