import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Book } from './Book';

interface BookCardProps {
    book: Book;
    onUpdate: (book: Book) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onStatusChange: (book: Book, status: string) => Promise<void>;
    showDeleteIcon?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, onUpdate, onDelete, onStatusChange, showDeleteIcon = true }) => {
    const [open, setOpen] = useState(false);

    const handleStatusChange = async (event: SelectChangeEvent<string>) => {
        const newStatus = event.target.value as string;
        await onStatusChange(book, newStatus);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        await onDelete(book.google_books_id);
        handleClose();
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
                <div className="book-details">
                    <Typography gutterBottom component="div" className="book-title">
                        {book.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div" className="book-author">
                        {book.author}
                    </Typography>
                </div>
                <div className="action-section">
                    <FormControl fullWidth>
                        <InputLabel id="book-status-label">Status</InputLabel>
                        <Select
                            labelId="book-status-label"
                            value={book.status || 'Add to collection'}
                            onChange={handleStatusChange}
                            label="Add to collection"
                        >
                            <MenuItem value="Add to collection" disabled>Add to collection</MenuItem>
                            <MenuItem value="Want to Read">Want to Read</MenuItem>
                            <MenuItem value="Reading">Reading</MenuItem>
                            <MenuItem value="Read">Read</MenuItem>
                        </Select>
                    </FormControl>
                    {showDeleteIcon && (
                        <IconButton className="delete-icon" onClick={handleClickOpen}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </div>
            </CardContent>

            {/* Delete Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete Book</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete "{book.title}" from your collection?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default BookCard;
