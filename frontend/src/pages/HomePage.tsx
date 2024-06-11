import React, { useState } from 'react';
import { Container, Grid, Typography, Pagination, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
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
    const [sortOption, setSortOption] = useState('');

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

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        const sortValue = event.target.value;
        setSortOption(sortValue);

        let sortedBooks = [...searchResults];
        switch (sortValue) {
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
        setSearchResults(sortedBooks);
    };

    return (
        <Container>
            <SearchBar query={query} setQuery={setQuery} searchBooks={searchBooks} />
            <div className="section">
                <div className="sort-pagination-container">
                    <Typography variant="h4" component="h2" className="h2-title" gutterBottom>
                        {hasSearched ? "Search Results" : "All Available Books"}
                    </Typography>
                    <FormControl variant="outlined" className="sort-dropdown">
                        <InputLabel className="sort-label" id="sort-label">Sort By</InputLabel>
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
                            <MenuItem value="status">Status</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Pagination
                    count={Math.ceil(totalItems / 40)}
                    page={page}
                    onChange={handlePageChange}
                    className="pagination"
                />
                <Grid className='book-item' container spacing={3}>
                    {searchResults.map(book => (
                        <Grid item key={book.google_books_id} xs={12} sm={6} md={3}>
                            <BookCard
                                book={book}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                                onStatusChange={handleStatusChange}
                                showDeleteIcon={true}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    count={Math.ceil(totalItems / 40)}
                    page={page}
                    onChange={handlePageChange}
                    className="footer-pagination"
                />
            </div>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default HomePage;
