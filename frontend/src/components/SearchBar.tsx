import React from 'react';
import { TextField, Button } from '@mui/material';

interface SearchBarProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    searchBooks: (e: React.FormEvent) => Promise<void>;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, searchBooks }) => {
    return (
        <form onSubmit={searchBooks} style={{ display: 'flex', marginBottom: '20px' }}>
            <TextField
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                label="Search for books"
                variant="outlined"
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                Search
            </Button>
        </form>
    );
};

export default SearchBar;
