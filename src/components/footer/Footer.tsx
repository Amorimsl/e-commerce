import { Link } from 'react-router-dom';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
});
type FormData = {
  email: string;
};

const getErrorMessage = (error: FieldError | undefined): string | null => {
  if (!error) return null;
  if (typeof error.message === 'string') return error.message;
  return JSON.stringify(error.message);
};

const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(emailSchema),
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <footer className="py-10  ">
      <div className="container mx-auto px-4 md:px-8">
        <div className="md:flex lg:justify-around">
          <div className="flex flex-col gap-6 md:gap-16 mb-6 md:mb-0">
            <h1 className="font-bold text-2xl">Furniro.</h1>
            <p className="text-color-transparent w-72">
              400 University Drive Suite 200 Coral Gables, <br />
              FL 33134 USA
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full shadow-xl p-2 bg-white"
              >
                <img
                  src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/Facebook.svg"
                  alt="Facebook"
                  className="w-5 h-5"
                />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full shadow-xl p-2 bg-white"
              >
                <img
                  src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/Instagram.svg"
                  alt="Instagram"
                  className="w-5 h-5 "
                />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full shadow-xl p-2 bg-white"
              >
                <img
                  src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/Twitter.svg"
                  alt="Twitter"
                  className="w-5 h-5"
                />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full shadow-xl p-2 bg-white"
              >
                <img
                  src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/Linkedin.svg"
                  alt="LinkedIn"
                  className="w-5 h-5"
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:gap-12 mb-6 md:mb-0">
            <div className="flex flex-col">
              <p className="md:mb-12 mb-8 text-color-transparent">Links</p>
              <nav className="flex flex-col md:gap-8 gap-2 font-semibold text-base">
                <Link to="/" className="text-gray-900 hover:text-blue-500">
                  Home
                </Link>
                <Link to="/Shop" className="text-gray-900 hover:text-blue-500">
                  Shop
                </Link>
                <Link to="/About" className="text-gray-900 hover:text-blue-500">
                  About
                </Link>
                <Link
                  to="/Contact"
                  className="text-gray-900 hover:text-blue-500"
                >
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex flex-col mt-6 md:mt-0 md:ml-12">
              <p className="mb-4 text-color-transparent md:mb-12">Help</p>
              <nav className="flex flex-col md:gap-8 gap-2 font-semibold text-base">
                <p>Payment Options</p>
                <p>Returns</p>
                <p>Privacy Policies</p>
              </nav>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4 md:gap-6 md:ml-8"
          >
            <p className="text-color-transparent mb-4 ">NewsLetter</p>
            <div className="flex flex-col md:flex-row md:items-center md:gap-6 flex-wrap">
              <div className="relative flex-grow w-full md:w-auto">
                <input
                  type="email"
                  id="email"
                  className={`appearance-none bg-transparent border-b-2 ${
                    errors.email ? 'border-red-500' : 'border-black'
                  } text-gray-900 focus:outline-none focus:border-blue-500 px-2 py-2 leading-tight w-full lg:w-56`}
                  placeholder="Enter Your Email Address"
                  {...register('email')}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm absolute top-full left-0 mt-1">
                    {getErrorMessage(errors.email)}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="bg-transparent border-b-2 border-black text-gray-900 focus:outline-none focus:border-blue-500 py-2 px-4 leading-tight mt-2 md:mt-0 w-full md:w-auto"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
        <div className="pt-36 md:pl-16 ">
          <p>2023 Furniro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
