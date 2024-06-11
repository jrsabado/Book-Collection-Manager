import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookCard from '../BookCard';

const book = {
  google_books_id: '1',
  title: 'Test Book',
  author: 'Test Author',
  description: 'This is a test description.',
  cover_image: 'https://via.placeholder.com/150',
  status: 'Want to Read',
};

test('renders BookCard and displays book details', () => {
  render(
    <BookCard
      book={book}
      onUpdate={jest.fn()}
      onDelete={jest.fn()}
      onStatusChange={jest.fn()}
      showDeleteIcon={true}
    />
  );

  expect(screen.getByText('Test Book')).toBeInTheDocument();
  expect(screen.getByText('Test Author')).toBeInTheDocument();
  expect(screen.getByText('Want to Read')).toBeInTheDocument();
});

test('opens delete confirmation dialog on delete icon click', () => {
  render(
    <BookCard
      book={book}
      onUpdate={jest.fn()}
      onDelete={jest.fn()}
      onStatusChange={jest.fn()}
      showDeleteIcon={true}
    />
  );

  fireEvent.click(screen.getByRole('button', { name: '' }));

  expect(screen.getByText(/are you sure you want to delete/i)).toBeInTheDocument();
});
