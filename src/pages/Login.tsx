import ImageCards from '../components/bgImageCards/ImageCards';

const Login = () => {
  return (
    <>
      <ImageCards />
      <div className="flex flex-col items-center justify-center  py-16">
        <section className="w-full max-w-md p-8 space-y-6  rounded-lg shadow-md bg-custom-bg">
          <h1 className="text-2xl font-semibold text-center text-gray-700">
            Login
          </h1>
          <form className="space-y-6 bg-">
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
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-custom-text-yellow rounded-lg focus:outline-none hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400"
            >
              Entrar
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default Login;
