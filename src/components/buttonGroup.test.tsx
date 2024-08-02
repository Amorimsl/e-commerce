import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ButtonGroup from './ButtonGroup';

describe('ButtonGroup', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders buttons and handles click events for page 1', () => {
    const setCurrentPage = vi.fn();
    render(
      <ButtonGroup
        currentPage={1}
        setCurrentPage={setCurrentPage}
        totalPages={3}
      />
    );

    expect(screen.getByText('1')).toHaveClass(
      'bg-custom-text-yellow text-white'
    );
    expect(screen.getByText('2')).not.toHaveClass(
      'bg-custom-text-yellow text-white'
    );
    expect(screen.getByText('3')).not.toHaveClass(
      'bg-custom-text-yellow text-white'
    );
    expect(screen.getByText('Next')).not.toHaveClass(
      'bg-custom-text-yellow text-white'
    );

    fireEvent.click(screen.getByText('2'));
    expect(setCurrentPage).toHaveBeenCalledWith(2);
  });

  it('handles click events and updates classes correctly for page 2', () => {
    const setCurrentPage = vi.fn();
    render(
      <ButtonGroup
        currentPage={2}
        setCurrentPage={setCurrentPage}
        totalPages={3}
      />
    );

    expect(screen.getByText('2')).toHaveClass(
      'bg-custom-text-yellow text-white'
    );
    expect(screen.getByText('1')).not.toHaveClass(
      'bg-custom-text-yellow text-white'
    );
    expect(screen.getByText('3')).not.toHaveClass(
      'bg-custom-text-yellow text-white'
    );
    expect(screen.getByText('Next')).not.toHaveClass(
      'bg-custom-text-yellow text-white'
    );

    fireEvent.click(screen.getByText('3'));
    expect(setCurrentPage).toHaveBeenCalledWith(3);
  });

  it('handles click on Next button for page 1', () => {
    const setCurrentPage = vi.fn();
    render(
      <ButtonGroup
        currentPage={1}
        setCurrentPage={setCurrentPage}
        totalPages={3}
      />
    );

    fireEvent.click(screen.getByText('Next'));
    expect(setCurrentPage).toHaveBeenCalledWith(2);
  });

  it('handles click on Next button for page 2', () => {
    const setCurrentPage = vi.fn();
    render(
      <ButtonGroup
        currentPage={2}
        setCurrentPage={setCurrentPage}
        totalPages={3}
      />
    );

    fireEvent.click(screen.getByText('Next'));
    expect(setCurrentPage).toHaveBeenCalledWith(3);
  });

  it('disables Next button appropriately on last page', () => {
    const setCurrentPage = vi.fn();
    render(
      <ButtonGroup
        currentPage={3}
        setCurrentPage={setCurrentPage}
        totalPages={3}
      />
    );

    expect(screen.getByText('Next')).toBeDisabled();

    fireEvent.click(screen.getByText('Next'));
    expect(setCurrentPage).not.toHaveBeenCalled();
  });

  it('handles cases with less than 3 total pages correctly for 1 page', () => {
    const setCurrentPage = vi.fn();
    render(
      <ButtonGroup
        currentPage={1}
        setCurrentPage={setCurrentPage}
        totalPages={1}
      />
    );

    expect(screen.queryByText('2')).toBeNull();
    expect(screen.queryByText('3')).toBeNull();
    expect(screen.queryByText('Next')).toBeNull();
  });
});
