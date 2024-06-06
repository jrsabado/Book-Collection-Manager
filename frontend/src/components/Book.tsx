export interface Book {
    id?: number; // Make the id optional for search results
    google_books_id: string;
    title: string;
    author: string;
    description: string;
    cover_image: string;
    published_year: number;
}

