import React from 'react';
import { Book } from './Book';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface BookCardProps {
    book: Book;
    onAdd?: (book: Book) => void;
    onEdit?: (book: Book) => void;
    onDelete?: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAdd, onEdit, onDelete }) => (
    <Card
        title={book.title}
        author={book.author}
        description={book.description}
        coverImage={book.cover_image}
        actions={
            <>
                {onAdd && <Button size="small" color="primary" onClick={() => onAdd(book)}>Add to Collection</Button>}
                {onEdit && <Button size="small" color="primary" onClick={() => onEdit(book)}>Edit</Button>}
                {onDelete && <Button size="small" color="secondary" onClick={() => onDelete(book.id!)}>Delete</Button>}
            </>
        }
    />
);

export default BookCard;
