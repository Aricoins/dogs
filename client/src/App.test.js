import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Dogs App', () => {
  render(<App />);
  const titleElement = screen.getByText(/Dogs App/i);
  expect(titleElement).toBeInTheDocument();
});
