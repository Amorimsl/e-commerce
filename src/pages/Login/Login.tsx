import { useState } from 'react';
import ImageCards from '../../components/bgImageCards/ImageCards';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import { FormEvent } from 'react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      toast.error('Login failed', {
        position: 'bottom-center',
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('User logged Successfully', { position: 'top-center' });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { position: 'bottom-center' });
      } else {
        toast.error('An unexpected error occurred', {
          position: 'bottom-center',
        });
      }
    }
  };

  return (
    <>
      <ImageCards />
      <div className="flex flex-col items-center justify-center py-16">
        <section className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md bg-custom-bg">
          <h1 className="text-2xl font-semibold text-center text-gray-700">
            Login
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-400"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-600"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-400"
                onChange={(e) => setPassWord(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-custom-text-yellow rounded-lg focus:outline-none hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400"
            >
              Entrar
            </button>
          </form>
          <p className="text-center text-gray-600">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Registrar
            </Link>
          </p>
          <p className="text-center">
            <Link to="/" className="text-indigo-600 hover:underline">
              Entrar como convidado
            </Link>
          </p>
        </section>
      </div>
    </>
  );
};

export default Login;
