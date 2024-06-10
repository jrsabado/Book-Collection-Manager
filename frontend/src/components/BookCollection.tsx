import React from 'react';
import { Grid } from '@mui/material';
import BookCard from './BookCard';
import { Book } from './Book';

interface BookCollectionProps {
    title: string;
    books: Book[];
    onUpdate: (book: Book) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

const BookCollection: React.FC<BookCollectionProps> = ({ title, books, onUpdate, onDelete }) => {
    return (
        <div>
            <h3>{title}</h3>
            <Grid container spacing={3}>
                {books.map(book => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={book.google_books_id}>
                        <BookCard
                            book={book}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default BookCollection;
