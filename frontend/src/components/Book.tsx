export interface Book {
    id: number; 
    google_books_id: string;
    title: string;
    author?: string;
    description?: string;
    cover_image?: string;
    published_year?: number;
    status: string;
  }
  