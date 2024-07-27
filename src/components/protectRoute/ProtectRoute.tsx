import { Navigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  user: User | null;
  children: ReactNode;
}

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/Login" />;
  }
  return children;
};

export default ProtectedRoute;
