import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToolTipFilter from './ToolTipFilter';

test('renders ToolTipFilter button', () => {
  render(<ToolTipFilter onSelectCategory={() => {}} />);

  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});

test('shows categories when menu is open', () => {
  render(<ToolTipFilter onSelectCategory={() => {}} />);

  fireEvent.click(screen.getByRole('button'));

  const menuItems = screen.getAllByRole('menuitem');
  expect(menuItems).toHaveLength(7);
});

test('hides categories when clicking outside', () => {
  render(<ToolTipFilter onSelectCategory={() => {}} />);

  fireEvent.click(screen.getByRole('button'));

  expect(screen.getByRole('menu')).toBeVisible();

  fireEvent.mouseDown(document);

  expect(screen.queryByRole('menu')).toBeNull();
});

test('calls onSelectCategory when a category is clicked', () => {
  const onSelectCategory = vi.fn();
  render(<ToolTipFilter onSelectCategory={onSelectCategory} />);

  fireEvent.click(screen.getByRole('button'));

  const categoryItem = screen.getByText('Racks');
  fireEvent.click(categoryItem);

  expect(onSelectCategory).toHaveBeenCalledWith('Racks');
});
