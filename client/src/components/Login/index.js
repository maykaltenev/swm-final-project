import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import style from "../Register/Register.module.css";

export default function Login() {
  const { userData, error } = useContext(UserContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    userData(formData);
  };

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleLogin}>
        <div>
          <p>Login</p>
          <p>{error}</p>
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
            Login
          </button>
          <p>
            Don't have an account ?{" "}
            {
              <Link className={style.a} variant="contained" to="/">
                Register
              </Link>
            }
          </p>
        </div>
      </form>
    </div>
  );
}
