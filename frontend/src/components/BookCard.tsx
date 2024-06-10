import React from 'react';
import { Card, CardContent, CardMedia, Typography, FormControl, InputLabel, Select, MenuItem, IconButton, SelectChangeEvent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Book } from './Book';

interface BookCardProps {
    book: Book;
    onUpdate: (book: Book) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onStatusChange?: (book: Book, status: string) => Promise<void>;
}

const BookCard: React.FC<BookCardProps> = ({ book, onUpdate, onDelete, onStatusChange }) => {
    const handleStatusChange = async (event: SelectChangeEvent<string>) => {
        const newStatus = event.target.value as string;
        if (onStatusChange) {
            await onStatusChange(book, newStatus);
        } else {
            const updatedBook = { ...book, status: newStatus };
            try {
                await onUpdate(updatedBook);
            } catch (error) {
                console.error("Error updating the book status:", error);
            }
        }
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
                        value={book.status || ''}
                        onChange={handleStatusChange}
                        label="Status"
                    >
                        <MenuItem value="Want to Read">Want to Read</MenuItem>
                        <MenuItem value="Reading">Reading</MenuItem>
                        <MenuItem value="Read">Read</MenuItem>
                    </Select>
                </FormControl>
                <IconButton onClick={() => onDelete(book.google_books_id)}>
                    <DeleteIcon />
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default BookCard;
