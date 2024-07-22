import { render, screen } from '@testing-library/react';
import App from './App';

it('should have hello word', () => {
  render(<App />);
  const message = screen.queryByText(/Hello World/i);

  expect(message).toBeVisible();
});
