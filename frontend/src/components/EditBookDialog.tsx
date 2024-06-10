import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Book } from './Book';

interface EditBookDialogProps {
    book: Book | null;
    open: boolean;
    onClose: () => void;
    onSave: (book: Book) => Promise<void>;
    setEditBook: React.Dispatch<React.SetStateAction<Book | null>>;
}

const EditBookDialog: React.FC<EditBookDialogProps> = ({ book, open, onClose, onSave, setEditBook }) => {
    if (!book) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        await onSave(book);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    fullWidth
                    variant="outlined"
                    value={book.title}
                    name="title"
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Author"
                    fullWidth
                    variant="outlined"
                    value={book.author}
                    name="author"
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    fullWidth
                    variant="outlined"
                    value={book.description}
                    name="description"
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Published Year"
                    fullWidth
                    variant="outlined"
                    value={book.published_year ? book.published_year.toString() : ''}
                    name="published_year"
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditBookDialog;
