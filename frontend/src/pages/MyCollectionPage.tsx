import React from 'react';
import BookCollection from '../components/BookCollection';
import { Book } from '../components/Book';

interface MyCollectionPageProps {
    collection: Book[];
    updateCollection: (book: Book) => Promise<void>;
    deleteFromCollection: (id: string) => Promise<void>;
}

const MyCollectionPage: React.FC<MyCollectionPageProps> = ({ collection, updateCollection, deleteFromCollection }) => {
    const wantToReadBooks = collection.filter(book => book.status === 'Want to Read');
    const readingBooks = collection.filter(book => book.status === 'Reading');
    const readBooks = collection.filter(book => book.status === 'Read');

    return (
        <div>
            <BookCollection title="Want to Read" books={wantToReadBooks} onUpdate={updateCollection} onDelete={deleteFromCollection} />
            <BookCollection title="Reading" books={readingBooks} onUpdate={updateCollection} onDelete={deleteFromCollection} />
            <BookCollection title="Read" books={readBooks} onUpdate={updateCollection} onDelete={deleteFromCollection} />
        </div>
    );
};

export default MyCollectionPage;
