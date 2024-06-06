import React from 'react';
import Dialog from '../ui/Dialog';
import TextField from '../ui/TextField';
import Button from '../ui/Button';
import { Book } from './Book';

interface EditBookDialogProps {
  book: Book | null;
  open: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
  setEditBook: React.Dispatch<React.SetStateAction<Book | null>>;
}

const EditBookDialog: React.FC<EditBookDialogProps> = ({ book, open, onClose, onSave, setEditBook }) => {
  if (!book) return null;

  const handleSave = () => {
    if (book) {
      onSave(book);
    }
  };

  return (
    <Dialog
      open={open}
      title="Edit Book"
      content={
        <>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={book.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditBook({ ...book, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Author"
            fullWidth
            variant="outlined"
            value={book.author}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditBook({ ...book, author: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            value={book.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditBook({ ...book, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Cover Image"
            fullWidth
            variant="outlined"
            value={book.cover_image}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditBook({ ...book, cover_image: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Published Year"
            fullWidth
            variant="outlined"
            value={book.published_year.toString()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditBook({ ...book, published_year: parseInt(e.target.value) })}
          />
        </>
      }
      actions={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </>
      }
      onClose={onClose}
    />
  );
};

export default EditBookDialog;
