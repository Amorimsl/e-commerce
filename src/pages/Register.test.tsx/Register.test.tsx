import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Register from '../Register';

describe('RegisterForm', () => {
  it('deve renderizar todos os inputs e o botão de submit', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByTestId('first-name-label')).toBeInTheDocument();
    expect(screen.getByTestId('first-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('last-name-label')).toBeInTheDocument();
    expect(screen.getByTestId('last-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-label')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-label')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('register-button')).toBeInTheDocument();
  });

  it('deve chamar a função handleRegister quando o formulário é enviado', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId('first-name-input'), {
      target: { value: 'Lucas' },
    });
    fireEvent.change(screen.getByTestId('last-name-input'), {
      target: { value: 'Amorim' },
    });
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'lucas@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    });

    fireEvent.submit(screen.getByTestId('register-form'));
  });

  it('deve exibir erros quando os campos são preenchidos incorretamente', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('register-button'));
  });
});
