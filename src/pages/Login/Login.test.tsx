import { Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

vi.mock('firebase/auth', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('firebase/auth');
  return {
    ...actual,
    getAuth: vi.fn(() => ({})),
    signInWithEmailAndPassword: vi.fn(),
  };
});

const toastSuccessSpy = vi
  .spyOn(toast, 'success')
  .mockImplementation(() => 'mock-toast-id');

describe('Login Page', () => {
  it('should show error toast on failed login', async () => {
    (signInWithEmailAndPassword as Mock).mockRejectedValue(
      new Error('Failed login')
    );

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: 'short' },
    });

    fireEvent.click(screen.getByText('Entrar'));
  });

  it('should show success toast on successful login', async () => {
    (signInWithEmailAndPassword as Mock).mockResolvedValue({});

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: 'validpassword' },
    });

    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(toastSuccessSpy).toHaveBeenCalledWith('User logged Successfully', {
        position: 'top-center',
      });
    });
  });
});
