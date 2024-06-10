import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Toolbar, Container, Typography } from '@mui/material';
import Button from './ui/Button';
import { Book } from './components/Book';
import EditBookDialog from './components/EditBookDialog';
import MyCollectionPage from './pages/MyCollectionPage';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Book[]>(() => {
        const savedResults = localStorage.getItem('searchResults');
        return savedResults ? JSON.parse(savedResults) : [];
    });
    const [collection, setCollection] = useState<Book[]>([]);
    const [dbMessage, setDbMessage] = useState('');
    const [editBook, setEditBook] = useState<Book | null>(null);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [hasSearched, setHasSearched] = useState(false);

    const fetchBooks = useCallback(async (searchQuery: string, pageNum: number) => {
        const startIndex = (pageNum - 1) * 40;
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${startIndex}&maxResults=40`);
        const books = response.data.items.map((item: any) => ({
            google_books_id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors?.[0],
            description: item.volumeInfo.description,
            cover_image: item.volumeInfo.imageLinks?.thumbnail,
            published_year: parseInt(item.volumeInfo.publishedDate?.split('-')[0]),
            status: localStorage.getItem(item.id) || 'Add to collection'
        }));
        setSearchResults(books);
        localStorage.setItem('searchResults', JSON.stringify(books));
        setTotalItems(response.data.totalItems);
    }, []);

    useEffect(() => {
        fetchBooks('subject:fiction', page);
    }, [fetchBooks, page]);

    const searchBooks = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetchBooks(query, 1);
        setHasSearched(true);
        setPage(1);
    };

    const addToCollection = async (book: Book) => {
        const response = await axios.post('http://localhost:8000/api/books', book);
        setCollection([...collection, response.data]);
    };

    const updateCollection = async (book: Book) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/books/${book.google_books_id}`, book);
            setCollection(collection.map(b => b.google_books_id === book.google_books_id ? response.data : b));
            setEditBook(null);
            setOpen(false);
        } catch (error) {
            console.error("Error updating the book:", error);
        }
    };

    const deleteFromCollection = async (id: string) => {
        await axios.delete(`http://localhost:8000/api/books/${id}`);
        setCollection(collection.filter(b => b.google_books_id !== id));
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

    const handleHomeClick = async () => {
        setHasSearched(false);
        setQuery('');
        await fetchBooks('subject:fiction', 1);
        setPage(1);
    };

    const handleMyCollectionClick = () => {
        window.location.href = "/my-collection";
    };

    const handleStatusChange = async (book: Book, status: string) => {
        const updatedBook = { ...book, status };
        localStorage.setItem(book.google_books_id, status);
        setSearchResults(prevResults => 
            prevResults.map(b => b.google_books_id === book.google_books_id ? updatedBook : b)
        );
        await updateCollection(updatedBook);
    };

    return (
        <Router>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">Book Collection Manager</Typography>
                        <nav>
                            <Link to="/" onClick={handleHomeClick}>Home</Link>
                            <Link to="/my-collection" onClick={handleMyCollectionClick}>My Collection</Link>
                        </nav>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Routes>
                        <Route path="/" element={
                            <HomePage 
                                query={query}
                                setQuery={setQuery}
                                searchResults={searchResults}
                                setSearchResults={setSearchResults}
                                searchBooks={searchBooks}
                                addToCollection={addToCollection}
                                page={page}
                                setPage={setPage}
                                totalItems={totalItems}
                                hasSearched={hasSearched}
                                onUpdate={updateCollection}
                                onDelete={deleteFromCollection}
                                onStatusChange={handleStatusChange}
                            />
                        } />
                        <Route path="/my-collection" element={
                            <MyCollectionPage 
                                collection={collection} 
                                onUpdate={updateCollection} 
                                onDelete={deleteFromCollection} 
                                onStatusChange={handleStatusChange}
                            />} 
                        />
                    </Routes>
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
        </Router>
    );
};

export default App;
