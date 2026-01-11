import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders VACCOVID brand', () => {
  const { getAllByText } = render(<App />);
  const linkElements = getAllByText(/VACCOVID/i);
  expect(linkElements[0]).toBeInTheDocument();
});
