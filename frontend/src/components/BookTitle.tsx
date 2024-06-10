import React from 'react';
import { Typography } from '@mui/material';

interface BookTitleProps {
  title: string;
}

const BookTitle: React.FC<BookTitleProps> = ({ title }) => {
  return (
    <Typography variant="h6" component="div" className="book-title">
      {title}
    </Typography>
  );
};

export default BookTitle;
