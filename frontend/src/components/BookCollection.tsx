import React from 'react';
import Grid from '../ui/Grid';
import { Book } from './Book';
import BookCard from './BookCard';
import Typography from '../ui/Typography';

interface BookCollectionProps {
    title: string;
    books: Book[];
    onAdd?: (book: Book) => void;
    onEdit?: (book: Book) => void;
    onDelete?: (id: number) => void;
}

const BookCollection: React.FC<BookCollectionProps> = ({ title, books, onAdd, onEdit, onDelete }) => (
    <div>
        <Typography variant="h4" style={{ marginTop: '20px' }}>{title}</Typography>
        <Grid container spacing={4}>
            {books.map((book) => (
                <Grid item key={book.id || book.google_books_id} xs={12} sm={6} md={4} lg={3}>
                    <BookCard book={book} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />
                </Grid>
            ))}
        </Grid>
    </div>
);

export default BookCollection;
