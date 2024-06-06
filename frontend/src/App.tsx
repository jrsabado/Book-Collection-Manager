import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Container } from '@mui/material';
import Button from './ui/Button';
import Typography from './ui/Typography';
import Grid from './ui/Grid';
import { Book } from './components/Book';
import SearchBar from './components/SearchBar';
import BookCollection from './components/BookCollection';
import EditBookDialog from './components/EditBookDialog';

const App: React.FC = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [collection, setCollection] = useState<Book[]>([]);
    const [dbMessage, setDbMessage] = useState('');
    const [editBook, setEditBook] = useState<Book | null>(null);
    const [open, setOpen] = useState(false);

    const searchBooks = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        setSearchResults(response.data.items.map((item: any) => ({
            google_books_id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors?.[0],
            description: item.volumeInfo.description,
            cover_image: item.volumeInfo.imageLinks?.thumbnail,
            published_year: parseInt(item.volumeInfo.publishedDate?.split('-')[0]),
        })));
    };

    const addToCollection = async (book: Book) => {
        const response = await axios.post('http://localhost:8000/api/books', book);
        setCollection([...collection, response.data]);
    };

    const updateCollection = async (book: Book) => {
        const response = await axios.put(`http://localhost:8000/api/books/${book.id}`, book);
        setCollection(collection.map(b => b.id === book.id ? response.data : b));
        setEditBook(null);
        setOpen(false);
    };

    const deleteFromCollection = async (id: number) => {
        await axios.delete(`http://localhost:8000/api/books/${id}`);
        setCollection(collection.filter(b => b.id !== id));
    };

    const handleEditClick = (book: Book) => {
        setEditBook(book);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditBook(null);
    };

    useEffect(() => {
        const fetchCollection = async () => {
            const response = await axios.get('http://localhost:8000/api/books');
            setCollection(response.data);
        };
        fetchCollection();
    }, []);

    const testDatabaseConnection = async () => {
        try {
            const response = await axios.get('http://localhost:8000/test-db');
            setDbMessage(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setDbMessage('Error: ' + error.message);
            } else {
                setDbMessage('Error: An unknown error occurred');
            }
        }
    };

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Book Search</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <SearchBar query={query} setQuery={setQuery} searchBooks={searchBooks} />
                <BookCollection
                    title="Search Results"
                    books={searchResults}
                    onAdd={addToCollection}
                />
                <BookCollection
                    title="My Collection"
                    books={collection}
                    onEdit={handleEditClick}
                    onDelete={deleteFromCollection}
                />
                <Button variant="contained" color="secondary" onClick={testDatabaseConnection} style={{ marginTop: '20px' }}>
                    Test Database Connection
                </Button>
                <Typography variant="body1" style={{ marginTop: '10px' }}>{dbMessage}</Typography>
            </Container>
            <EditBookDialog
                book={editBook}
                open={open}
                onClose={handleClose}
                onSave={updateCollection}
                setEditBook={setEditBook}
            />
        </div>
    );
};

export default App;
