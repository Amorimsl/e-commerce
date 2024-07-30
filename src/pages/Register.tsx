import { useState } from 'react';
import ImageCards from '../components/bgImageCards/ImageCards';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);

      if (user) {
        await setDoc(doc(db, 'Users', user.uid), {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
        });
      }

      toast.success('User Registered Successfully', { position: 'top-center' });
      navigate(`/Login`);
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
      <div className="flex flex-col items-center justify-center bg-gray-100 py-16">
        <section className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-center text-gray-700">
            Registrar
          </h1>
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-600"
              >
                Nome
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-400"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-600"
              >
                Sobrenome
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-400"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
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
                required
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
                required
                onChange={(e) => setPassWord(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg focus:outline-none hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400"
            >
              Registrar
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default Register;
