import React from 'react';
import { Typography } from '@mui/material';

interface BookDetailsProps {
  title: string;
  author: string;
}

const BookDetails: React.FC<BookDetailsProps> = ({ title, author }) => {
  return (
    <div className="book-details">
      <Typography variant="h6" className="book-title">
        {title}
      </Typography>
      {author && <Typography variant="body2" className="book-author">
        {author}
      </Typography>}
    </div>
  );
};

export default BookDetails;
