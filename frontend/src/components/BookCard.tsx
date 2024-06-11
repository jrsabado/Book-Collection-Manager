import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, DialogContentText } from '@mui/material';
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
    const [descriptionOpen, setDescriptionOpen] = useState(false);

    const handleStatusChange = async (event: SelectChangeEvent<string>) => {
        event.stopPropagation(); // Prevent event propagation
        const newStatus = event.target.value as string;
        await onStatusChange(book, newStatus);
    };

    const handleDescriptionOpen = () => {
        setDescriptionOpen(true);
    };

    const handleDescriptionClose = () => {
        setDescriptionOpen(false);
    };

    const handleClickOpen = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent event propagation
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        await onDelete(book.google_books_id);
        // Set status back to "Add to collection"
        book.status = "Add to collection";
        handleClose();
    };

    return (
        <>
            <Card className="book-card" onClick={handleDescriptionOpen}>
                <CardMedia
                    component="img"
                    alt={book.title}
                    height="300"
                    image={book.cover_image}
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
                        <FormControl fullWidth onClick={(e) => e.stopPropagation()}>
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
            </Card>

            {/* Description Dialog */}
            <Dialog open={descriptionOpen} onClose={handleDescriptionClose} maxWidth="md" fullWidth>
                <DialogContent className="dialog-content">
                    <div className="dialog-details">
                        <Typography variant="h6" component="div" className="dialog-title">
                            {book.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="div" className="dialog-author">
                            by {book.author}
                        </Typography>
                        <Typography variant="body2" component="div" className="dialog-description">
                            {book.description}
                        </Typography>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDescriptionClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

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
        </>
    );
};

export default BookCard;
