import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const UserIndex = () => {
    const [users,setUsers] = useState([]);  

    useEffect(() => {        
        fetchUsers();
    },[]);

    return (
        <div>
            {users.map((user)=>{
                return (
                    <Card
                    key={user.id}
                    >
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                <a href={'users/' + user.id}>{user.name}</a>
                            </Typography>                            
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {user.created_at}
                            </Typography>             
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );

    function fetchUsers() {
        axios.get('/users/index')
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default UserIndex;


