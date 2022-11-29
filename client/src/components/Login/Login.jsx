import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Login() {
  const { userData, error } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    userData(formData);
   
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col m-3 w-full  m-10 font-poppins">
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
          <button  className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mb-4" type="submit">Login</button>
          <p>
            Don't have an account ?{" "}
            {
              <Link className="text-blue-600 hover:text-primary-bg" variant="contained" to="/">
                Register
              </Link>
            }
          </p>
        </div>
      </form>
    </div>
  );
}
