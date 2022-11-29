import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Login() {
  const { userData, error, handleShowRegisterForm, setOpenLoginForm } =
    useContext(UserContext);

  const handleLogin = async (event) => {

    event.preventDefault();
    /* setOpenLoginForm(false); */
    const formData = new FormData(event.target);
    userData(formData);

  };
  
  return (
    /* overlay for register component on top of home component ---homepage */
    <div className="fixed w-full h-full top-20 left-0 right-0 bg-neutral-800/75 flex justify-center align-center z-10">
      {/* overlay of register component*/}
      <div className="absolute top-50 left-50 z-30 ">
        <form onSubmit={handleLogin}>
          <div className="bg-pink-100 rounded-lg p-8 flex flex-col m-3 m-10 font-poppins">
            <p className="title-font text-2xl mb-4">Login</p>
            <p>{error}</p>
            <div class="relative mb-4">
              <input
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-col"
                label="Email"
                placeholder=" E-mail"
                type="email"
                autoComplete="email"
                name="email"
                required
              />
            </div>
            <div class="relative mb-4">
              <input
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                label="Password"
                placeholder="Password"
                type="password"
                autoComplete="new-password"
                name="password"
                required
              />
            </div>
            <button onClick={() => setOpenLoginForm(false)}
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mb-4"
              type="submit"
            >
              Login
            </button>
            <p>
              Don't have an account ?{" "}
              {
                <Link
                  onClick={handleShowRegisterForm}
                  className="text-blue-600 hover:text-primary-bg"
                  variant="contained"
                >
                  Register
                </Link>
              }
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
