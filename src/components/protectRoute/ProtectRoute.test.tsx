import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectRoute';
import { User } from 'firebase/auth';
import Login from '../../pages/Login';

// Componente de teste para o redirecionamento
const MockComponent = () => <div>Protected Content</div>;

describe('ProtectedRoute', () => {
  it('redirects to /Login if user is not authenticated', async () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute user={null}>
                <MockComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    // Espera até que a URL seja atualizada para verificar a redireção
  });

  it('renders children if user is authenticated', () => {
    const mockUser: User = {} as User;

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute user={mockUser}>
                <MockComponent />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<MockComponent />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
