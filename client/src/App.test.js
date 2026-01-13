import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders VACCOVID link', () => {
  const { getAllByText } = render(<App />);
  const linkElements = getAllByText(/VACCOVID/i);
  expect(linkElements.length).toBeGreaterThan(0);
});
