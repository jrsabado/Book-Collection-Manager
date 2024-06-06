import React from 'react';
import TextField from '../ui/TextField';
import Button from '../ui/Button';

interface SearchBarProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    searchBooks: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, searchBooks }) => (
    <form onSubmit={searchBooks} style={{ margin: '20px 0', textAlign: 'center' }}>
        <TextField
            label="Search for books"
            variant="outlined"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            style={{ marginRight: '10px', width: '60%' }}
        />
        <Button type="submit" variant="contained" color="primary">Search</Button>
    </form>
);

export default SearchBar;
