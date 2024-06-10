import React from 'react';
import BookCollection from '../components/BookCollection';
import { Book } from '../components/Book';

interface MyCollectionPageProps {
    collection: Book[];
    onUpdate: (book: Book) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

const MyCollectionPage: React.FC<MyCollectionPageProps> = ({ collection, onUpdate, onDelete }) => {
    return (
        <div>
            <h2>My Collection</h2>
            <BookCollection
                title="Want to Read"
                books={collection.filter(book => book.status === 'Want to Read')}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
            <BookCollection
                title="Reading"
                books={collection.filter(book => book.status === 'Reading')}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
            <BookCollection
                title="Read"
                books={collection.filter(book => book.status === 'Read')}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
        </div>
    );
};

export default MyCollectionPage;
