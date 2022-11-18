import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext"; //for google
//css
import "./Register.css";

export default function Register() {
  const { disabled, setDisabled,googleUser, setGoogleUser,openRegisterForm, setOpenRegisterForm } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpenRegisterForm(false);
    const formData = new FormData(event.target);
    try {
      await axios
        .post("http://localhost:5000/user/register", {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          password: formData.get("password"),
        })
       .then(navigate("/login"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={openRegisterForm ? "show" : "register-container"}>
    <div className="container">
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
          <button onClick={() => setOpenRegisterForm(false)} type="submit">Register</button>
          <p>
            Already have an account ?{" "}
            {
              <Link variant="contained" to="/login">
                Login
              </Link>
            }
          </p>
        </div>
        
      </form>
      {/* -----------------------google button--------------- */}
      <div id="signInDiv"> </div>
        {/*  if we have no user : signin button
      if we have user : show logout button */}
        
         {/* -----------------------google button--------------- */}
    </div>
    </div>
  );
}
