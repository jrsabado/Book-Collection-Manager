export interface Book {
    created_at: string;
    id: number; 
    google_books_id: string;
    title: string;
    author?: string;
    description?: string;
    cover_image?: string;
    published_year?: number;
    status: string;
  }
  