import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


function CardRecipe(props) {

    return (
    <Card className="card" sx={{ maxWidth: 300 }} onClick={e => props.onClick(e, props.recipeid, props.title, props.time, props.ingredients, props.prepare)}>
            <CardActionArea>
                <CardMedia component="img" height="140" image={props.media} alt="Carbonara Paste" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{props.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{props.time}</Typography>
                </CardContent>
            </CardActionArea>
    </Card>
    )}

export default CardRecipe