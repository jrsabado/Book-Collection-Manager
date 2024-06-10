import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Book } from './Book';

interface BookCardProps {
    book: Book;
    onAddToWantToRead?: (book: Book) => void;
    onAddToReading?: (book: Book) => void;
    onAddToRead?: (book: Book) => void;
    onUpdate?: (book: Book) => Promise<void>;
    onDelete?: (id: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToWantToRead, onAddToReading, onAddToRead, onUpdate, onDelete }) => {
    const handleStatusChange = async (event: SelectChangeEvent<string>) => {
        const newStatus = event.target.value as string;
        const updatedBook = { ...book, status: newStatus };
        if (onUpdate) await onUpdate(updatedBook);
    };

    return (
        <Card className="book-card">
            <CardMedia
                component="img"
                alt={book.title}
                height="300"
                image={book.cover_image}
                title={book.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="div">
                    {book.author}
                </Typography>
                <FormControl fullWidth>
                    <InputLabel id="book-status-label">Status</InputLabel>
                    <Select
                        labelId="book-status-label"
                        value={book.status}
                        onChange={handleStatusChange}
                        label="Status"
                    >
                        <MenuItem value="Want to Read">Want to Read</MenuItem>
                        <MenuItem value="Reading">Reading</MenuItem>
                        <MenuItem value="Read">Read</MenuItem>
                    </Select>
                </FormControl>
                <IconButton onClick={() => onDelete && onDelete(book.google_books_id)}>
                    <DeleteIcon />
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default BookCard;
