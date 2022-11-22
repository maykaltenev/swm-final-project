import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GLogin from "../GLogin/Glogin";
//image
import GoogleLogo from "../../assets/googlelogo.png"

export default function Register() {
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Register</p>
          <input
            label="First Name"
            placeholder="First name"
            type="text"
            autoComplete="firstName"
            name="firstName"
            required
          />
          <input
            label="Last Name"
            placeholder="Last name"
            type="text"
            autoComplete="lastName"
            name="lastName"
            required
          />
          <input
            label="Email"
            placeholder=" E-mail"
            type="email"
            autoComplete="email"
            name="email"
            required
          />

          <input
            label="Password"
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            name="password"
            required
          />
          <button type="submit">Register</button>
          <p>
            Already have an account ?{" "}
            {
              <Link variant="contained" to="/login">
                Login
              </Link>
            }
          </p>
          <a href='/user/google'><img src={GoogleLogo} alt=''/></a>
        </div>
      <GLogin/>
      </form>
    </div>
  );
}
