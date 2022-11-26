import { useContext, useEffect } from "react";
import axios from "axios"
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Login() {
  const { userData, error } = useContext(UserContext);
  const {id} = useParams()



  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    userData(formData);
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <p>Login</p>
          <p>{error}</p>
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
          <button type="submit">Login</button>
          <p>
            Don't have an account ?{" "}
            {
              <Link variant="contained" to="/">
                Register
              </Link>
            }
          </p>
        </div>
      </form>
    </div>
  );
}
