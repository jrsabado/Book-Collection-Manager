import React from 'react';
import SearchBar from '../components/SearchBar';
import BookCollection from '../components/BookCollection';
import Pagination from '../components/Pagination';
import { Book } from '../components/Book';

interface HomePageProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    searchResults: Book[];
    searchBooks: (e: React.FormEvent) => Promise<void>;
    addToCollection: (book: Book) => Promise<void>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalItems: number;
    hasSearched: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ query, setQuery, searchResults, searchBooks, addToCollection, page, setPage, totalItems, hasSearched }) => {
    return (
        <div>
            <SearchBar query={query} setQuery={setQuery} searchBooks={searchBooks} />
            {hasSearched ? (
                <>
                    <h2>Search Results</h2>
                    <Pagination
                        page={page}
                        setPage={setPage}
                        totalItems={totalItems}
                        itemsPerPage={40}
                    />
                    <BookCollection title="Search Results" books={searchResults} onAddToWantToRead={addToCollection} />
                    <Pagination
                        page={page}
                        setPage={setPage}
                        totalItems={totalItems}
                        itemsPerPage={40}
                    />
                </>
            ) : (
                <>
                    <h2>All Books</h2>
                    <Pagination
                        page={page}
                        setPage={setPage}
                        totalItems={totalItems}
                        itemsPerPage={40}
                    />
                    <BookCollection title="All Books" books={searchResults} onAddToWantToRead={addToCollection} />
                    <Pagination
                        page={page}
                        setPage={setPage}
                        totalItems={totalItems}
                        itemsPerPage={40}
                    />
                </>
            )}
        </div>
    );
};

export default HomePage;
