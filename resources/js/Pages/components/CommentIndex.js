import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CommentIndex = (props) => {
    const [user,setUser] = useState({id: 0, name:'Anonymous'});
    const comments = props.comments;
    // add mention function to enhance the interactive?
    // add the remove/report button or something

    return (
        <div>
            {comments.map((comment)=>{
                return (
                    <Card
                    key={comment.id}
                    >
                        <CardContent>                         
                        <Typography variant="body">
                            {comment.body}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {comment.created_at}
                        </Typography>                           
                        </CardContent>
                    </Card>
                )
            })}
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
}

export default CommentIndex;


