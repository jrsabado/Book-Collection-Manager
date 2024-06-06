import React from 'react';
import { Book } from './Book';

interface BookListProps {
    books: Book[];
    onAddToCollection?: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onAddToCollection }) => {
    return (
        <div className="book-list">
            {books.map((book) => (
                <div key={book.google_books_id} className="book">
                    <img src={book.cover_image} alt={book.title} />
                    <div>
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        <p>{book.description}</p>
                        {onAddToCollection && (
                            <button onClick={() => onAddToCollection(book)}>Add to Collection</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookList;
