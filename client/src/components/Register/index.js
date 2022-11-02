import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import style from "./Register.module.css";

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
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit} className={style.form}>
        <div>
          <p>Register</p>
          <input
            label="First Name"
            className={style.input}
            placeholder="First name"
            type="text"
            autoComplete="firstName"
            name="firstName"
            required
          />
          <input
            label="Last Name"
            className={style.input}
            placeholder="Last name"
            type="text"
            autoComplete="lastName"
            name="lastName"
            required
          />
          <input
            label="Email"
            className={style.input}
            placeholder=" E-mail"
            type="email"
            autoComplete="email"
            name="email"
            required
          />

          <input
            label="Password"
            className={style.input}
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            name="password"
            required
          />
          <button className={style.button} type="submit">
            Register
          </button>
          <p>
            Already have an account ?{" "}
            {
              <Link className={style.a} variant="contained" to="/login">
                Login
              </Link>
            }
          </p>
        </div>
      </form>
    </div>
  );
}
