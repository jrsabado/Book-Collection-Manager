export interface Book {
    id: number; // Ensure this is the primary key from the database
    google_books_id: string;
    title: string;
    author?: string;
    description?: string;
    cover_image?: string;
    published_year?: number;
    status: string;
  }
  