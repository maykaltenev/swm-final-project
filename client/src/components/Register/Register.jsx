import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
//image
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import GoogleLogo from "../../assets/googlesignin.png";

export default function Register() {
  const {
    setOpenRegisterForm,
    setOpenLoginForm,
    handleShowLoginForm,
    visible,
    setVisible,
  } = useContext(UserContext);

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
        .then(navigate("/"));
    } catch (error) {
      console.log(error);
    }
    setOpenRegisterForm(false);
    setOpenLoginForm(true);
  };

  /* const handleRegistration = () => {
 setOpenRegisterForm(false) 
  setOpenLoginForm(true)
  }
   */
  return (
    /* overlay for register component on top of home component ---homepage */
    <div className="fixed w-full h-full top-20 left-0 right-0 bg-neutral-800/75 flex justify-center align-center z-10">
      {/* overlay of register component*/}
      <div className="absolute top-50 left-50 z-30 ">
        <form onSubmit={handleSubmit}>
          <div className=" bg-nav-raisin-black-4 text-white rounded-lg p-8 flex flex-col m-3 m-10 font-poppins">
            <p className="title-font text-2xl mb-4">Register</p>
            <div className="relative mb-4">
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
            <div className="relative mb-4">
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
                type={visible ? "password" : "text"}
                autoComplete="new-password"
                name="password"
                required
              />
              <span
                className="absolute right-5 top-3"
                onClick={() => setVisible(!visible)}
              >
                {!visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <button
              className="text-white bg-btn-majorelle-blue border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mb-4"
              type="submit"
            >
              Register
            </button>

            <p>
              Already have an account ?{" "}
              {
                <button
                  onClick={handleShowLoginForm}
                  className="text-cyber-yellow hover:text-primary-bg"
                  variant="contained"
                >
                  Login
                </button>
              }
            </p>
            {/* <button
              href="/user/google"
              type="button"
              class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              <svg
                class="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google
            </button> */}
            <a className="flex justify-center ">
              <img src={GoogleLogo} width="230px" alt="" />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
