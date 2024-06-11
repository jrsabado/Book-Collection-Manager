const request = require('supertest');
const app = require('../app'); // Adjust path as necessary

describe('GET /api/books', () => {
  it('should return a list of books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe('POST /api/books', () => {
  it('should create a new book', async () => {
    const newBook = {
      google_books_id: '2',
      title: 'New Test Book',
      author: 'New Test Author',
      description: 'This is a new test description.',
      cover_image: 'https://via.placeholder.com/150',
      status: 'Reading',
    };

    const response = await request(app)
      .post('/api/books')
      .send(newBook);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('google_books_id', newBook.google_books_id);
  });
});
