import React from 'react';
import { Grid } from '@mui/material';
import BookCard from './BookCard';
import { Book } from './Book';

interface BookCollectionProps {
    title: string;
    books: Book[];
    onAddToWantToRead?: (book: Book) => void;
    onAddToReading?: (book: Book) => void;
    onAddToRead?: (book: Book) => void;
    onUpdate?: (book: Book) => Promise<void>;
    onDelete?: (id: string) => void;
}

const BookCollection: React.FC<BookCollectionProps> = ({ title, books, onAddToWantToRead, onAddToReading, onAddToRead, onUpdate, onDelete }) => {
    return (
        <div>
            <h2>{title}</h2>
            <Grid container spacing={3}>
                {books.map((book) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={book.google_books_id}>
                        <BookCard
                            book={book}
                            onAddToWantToRead={onAddToWantToRead}
                            onAddToReading={onAddToReading}
                            onAddToRead={onAddToRead}
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
