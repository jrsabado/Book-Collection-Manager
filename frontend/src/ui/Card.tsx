import React from 'react';
import { Card as MuiCard, CardContent, CardActions, CardMedia, Typography } from '@mui/material';

interface CardProps {
    title: string;
    author: string;
    description: string;
    coverImage: string;
    actions: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, author, description, coverImage, actions }) => (
    <MuiCard>
        <CardMedia
            component="img"
            height="140"
            image={coverImage}
            alt={title}
        />
        <CardContent>
            <Typography variant="h5" component="div">
                {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {author}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {description}
            </Typography>
        </CardContent>
        <CardActions>
            {actions}
        </CardActions>
    </MuiCard>
);

export default Card;
