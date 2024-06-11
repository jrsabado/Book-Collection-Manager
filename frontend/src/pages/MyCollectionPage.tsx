import React, { useState } from 'react';
import BookCollection from '../components/BookCollection';
import { Book } from '../components/Book';
import { Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface MyCollectionPageProps {
    collection: Book[];
    onUpdate: (book: Book) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onStatusChange: (book: Book, status: string) => Promise<void>;
}

const MyCollectionPage: React.FC<MyCollectionPageProps> = ({ collection, onUpdate, onDelete, onStatusChange }) => {
    const [sortOption, setSortOption] = useState('');

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        const sortValue = event.target.value;
        setSortOption(sortValue);
    };

    const getSortedBooks = (books: Book[]) => {
        let sortedBooks = [...books];
        switch (sortOption) {
            case 'title-asc':
                sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'author-asc':
                sortedBooks.sort((a, b) => (a.author ?? '').localeCompare(b.author ?? ''));
                break;
            case 'author-desc':
                sortedBooks.sort((a, b) => (b.author ?? '').localeCompare(a.author ?? ''));
                break;
            case 'status':
                sortedBooks.sort((a, b) => (a.status ?? '').localeCompare(b.status ?? ''));
                break;
            case 'date-newest':
                sortedBooks.sort((a, b) => new Date(b.created_at ?? '').getTime() - new Date(a.created_at ?? '').getTime());
                break;
            case 'date-oldest':
                sortedBooks.sort((a, b) => new Date(a.created_at ?? '').getTime() - new Date(b.created_at ?? '').getTime());
                break;
            default:
                break;
        }
        return sortedBooks;
    };

    return (
        <div className="container">
            <div className="section">
            <div className="sort-pagination-container">
                <Typography variant="h4" component="h2" className="h2-title" gutterBottom>
                    My Book Collection
                </Typography>
                <FormControl variant="outlined" className="sort-dropdown">
                    <InputLabel id="sort-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-label"
                        value={sortOption}
                        onChange={handleSortChange}
                        label="Sort By"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="title-asc">Title (A-Z)</MenuItem>
                        <MenuItem value="title-desc">Title (Z-A)</MenuItem>
                        <MenuItem value="author-asc">Author (A-Z)</MenuItem>
                        <MenuItem value="author-desc">Author (Z-A)</MenuItem>
                    </Select>
                </FormControl>
            </div>
                <BookCollection
                    title="Want to Read"
                    books={getSortedBooks(collection.filter(book => book.status === 'Want to Read'))}
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
                    books={getSortedBooks(collection.filter(book => book.status === 'Reading'))}
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
                    books={getSortedBooks(collection.filter(book => book.status === 'Read'))}
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
