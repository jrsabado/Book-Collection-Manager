import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import axios from 'axios';

jest.mock('axios');

test('renders Book Collection Manager header', async () => {
  (axios.get as jest.Mock).mockResolvedValue({
    data: {
      items: [],
    },
  });

  render(<App />);

  const headerElement = await screen.findByText(/Book Collection Manager/i);
  expect(headerElement).toBeInTheDocument();
});
