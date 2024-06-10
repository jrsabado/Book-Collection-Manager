// BookCollection.tsx
import React from 'react';
import { Grid, Typography } from '@mui/material';
import BookCard from './BookCard';
import { Book } from './Book';

interface BookCollectionProps {
    title: string;
    books: Book[];
    onUpdate: (book: Book) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onStatusChange: (book: Book, status: string) => Promise<void>;
    showDeleteIcon: boolean;
}

const BookCollection: React.FC<BookCollectionProps> = ({ title, books, onUpdate, onDelete, onStatusChange, showDeleteIcon }) => {
    return (
        <div>
            <Typography variant="h5" component="h3" className='section-title-collection' gutterBottom>
                {title}
            </Typography>
            <Grid container spacing={3}>
                {books.map(book => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={book.google_books_id}>
                        <BookCard
                            book={book}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            onStatusChange={onStatusChange}
                            showDeleteIcon={showDeleteIcon}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default BookCollection;
