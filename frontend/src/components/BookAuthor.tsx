import React from 'react';
import { Typography } from '@mui/material';

interface BookAuthorProps {
  author: string;
}

const BookAuthor: React.FC<BookAuthorProps> = ({ author }) => {
  return (
    <Typography variant="body2" color="textSecondary" className="book-author">
      {author}
    </Typography>
  );
};

export default BookAuthor;
