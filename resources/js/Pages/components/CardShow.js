import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { random } from 'lodash';

export default function CardShow(props) {
  return (
    <Card>
        {(props.images !== undefined &&  props.images !== null) ? props.images.map((image) => {
            return (<CardMedia
                key={random}
                component="img"
                height="140"
                image={image.path}
              />)
        }) : (<div></div>)}
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
                {props.post.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
                {(props.author !== undefined && props.author !== null) ? props.author.name : 'Anonymous'}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
                {new Date(props.post.created_at).toLocaleString()}
          </Typography>
          <Typography variant="body1" color="text.secondary">
                {props.post.body}
          </Typography>
        </CardContent>
    </Card>
  );
}