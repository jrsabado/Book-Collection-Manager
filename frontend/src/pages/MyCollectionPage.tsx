import React from 'react';
import BookCollection from '../components/BookCollection';
import { Book } from '../components/Book';
import { Typography } from '@mui/material';

interface MyCollectionPageProps {
    collection: Book[];
    onUpdate: (book: Book) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onStatusChange: (book: Book, status: string) => Promise<void>;
}

const MyCollectionPage: React.FC<MyCollectionPageProps> = ({ collection, onUpdate, onDelete, onStatusChange }) => {
    return (
        <div className="container">
            <div className="section">
            <Typography variant="h4" component="h2" className="h2-title" gutterBottom>
                My Book Collection
            </Typography>
                <BookCollection
                    title="Want to Read"
                    books={collection.filter(book => book.status === 'Want to Read')}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                    showDeleteIcon={true}
                />
                <div className="divider"></div>
            </div>
            <div className="section">
                <BookCollection
                    title="Reading"
                    books={collection.filter(book => book.status === 'Reading')}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                    showDeleteIcon={true} 
                />
                <div className="divider"></div>
            </div>
            <div className="section">
                <BookCollection
                    title="Read"
                    books={collection.filter(book => book.status === 'Read')}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                    showDeleteIcon={true}
                />
                <div className="divider"></div>
            </div>
        </div>
    );
};

export default MyCollectionPage;
