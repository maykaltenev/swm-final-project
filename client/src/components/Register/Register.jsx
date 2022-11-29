import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import "./Register.css";

export default function Register() {
  const { openRegisterForm,setOpenRegisterForm } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await axios
        .post("http://localhost:5000/user/register", {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          password: formData.get("password"),
        })
        /* .then(() => dispatch(authActions.login())) */
        .then(navigate("/login"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={
        openRegisterForm
          ? "show"
          : "lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col m-3 w-full  m-10 font-poppins"
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col m-3 w-full  m-10 font-poppins">
          <p className="title-font text-2xl mb-4">Register</p>
          <div class="relative mb-4">
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              label="First Name"
              placeholder="First name"
              type="text"
              autoComplete="firstName"
              name="firstName"
              required
            />
          </div>
          <div class="relative mb-4">
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              label="Last Name"
              placeholder="Last name"
              type="text"
              autoComplete="lastName"
              name="lastName"
              required
            />
          </div>
          <div class="relative mb-4">
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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

          <button
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mb-4"
            type="submit"
          >
            Register
          </button>

          <p>
            Already have an account ?{" "}
            {
              <Link
              onClick={() => setOpenRegisterForm(false)}
                className="text-blue-600 hover:text-primary-bg"
                variant="contained"
                to="/login"
              >
                Login
              </Link>
            }
          </p>
        </div>
      </form>
    </div>
  );
}
