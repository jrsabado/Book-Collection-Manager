import React, { useState } from 'react';
import { Container, Grid, Typography, Pagination, Snackbar, Alert } from '@mui/material';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { Book } from '../components/Book';

interface HomePageProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    searchResults: Book[];
    setSearchResults: React.Dispatch<React.SetStateAction<Book[]>>;
    searchBooks: (e: React.FormEvent) => Promise<void>;
    addToCollection: (book: Book) => Promise<void>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalItems: number;
    hasSearched: boolean;
    onUpdate: (book: Book) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onStatusChange: (book: Book, status: string) => Promise<void>;
}

const HomePage: React.FC<HomePageProps> = ({ 
    query, 
    setQuery, 
    searchResults, 
    setSearchResults,
    searchBooks, 
    addToCollection, 
    page, 
    setPage, 
    totalItems, 
    hasSearched,
    onUpdate,
    onDelete,
    onStatusChange
}) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleStatusChange = async (book: Book, status: string) => {
        const updatedBook = { ...book, status };
        try {
            await addToCollection(updatedBook);
            setSearchResults(prevResults => prevResults.map(b => b.google_books_id === book.google_books_id ? updatedBook : b));
            setSnackbarMessage(`${book.title} added to ${status}`);
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error updating the book status:", error);
        }
    };

    return (
        <Container>
            <SearchBar query={query} setQuery={setQuery} searchBooks={searchBooks} />
            <Typography variant="h4" component="h2" gutterBottom>
                {hasSearched ? "Search Results" : "All Books"}
            </Typography>
            <Grid container spacing={3}>
                {searchResults.map(book => (
                    <Grid item key={book.google_books_id} xs={12} sm={6} md={3}>
                        <BookCard 
                            book={book}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            onStatusChange={handleStatusChange} 
                            // showDeleteIcon={false}                        
                            />
                    </Grid>
                ))}
            </Grid>
            <Pagination 
                count={Math.ceil(totalItems / 40)} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
            />
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default HomePage;
