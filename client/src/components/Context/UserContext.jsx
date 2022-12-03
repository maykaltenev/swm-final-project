import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import addMinutes from "date-fns/addMinutes";

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {

  const navigate = useNavigate();
  //to display if there is error
  const [error, setError] = useState("");
  //creating state for the user
  const [user, setUser] = useState("");
  //open register form when join us button in header is clicked
  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  //when a user is loggedin after auth
  const [openLoginForm, setOpenLoginForm] = useState(false);
  //sign in the right user from db
  const [signIn, setSignIn] = useState({});
   //for eye icon in password
   const [visible, setVisible] = useState(false);

/* collect user details from login form and send to backend */
  const userData = async (formData) => {
    try {
      await axios
        .post(
          "http://localhost:5000/user/login",
          {
            email: formData.get("email"),
            password: formData.get("password"),
          },
          {
            withCredentials: true,
          }
        )/* once user details collected from login form, set the user details in local storage */
        .then((data) =>
          localStorage.setItem("user", JSON.stringify(data.data.user))
        )/* once stored in local storage, call the local storage function */
        .then(() => {
          localStorageUser();
        });
      setError(""); /* clear the error state */
      navigate("/userprofile"); /* navigate the user to his profile page */
      return;
    } catch (error) { /* if the user details doesn't match with the database throw error*/
      console.log(error);
      setError(" The email address or password is incorrect ");
    }
  };
  /* handlong the logout function */
  const handleLogout = async () => {
    try {
      await axios
        .get("http://localhost:5000/user/logout", { /* get the details of user from db */
          withCredentials: true,
        })
        .then(() => {  /* then reset the state of the user */
          setUser("");
        })
        .then(localStorage.clear("user")) // clear the user from local storage
        .then(() => navigate("/")); // navigate to home page
    } catch (error) { /* throw error if it doesn't match */
      console.log(error);
    }
  };
  /* function to get the user details from localstorage */
  const localStorageUser = () => {
    /* get user details from local storage */
    const user = JSON.parse(localStorage.getItem("user"));
    /* set the user details into user state */
    setUser(user);
    return;
  };
/* setting the user and his id and setting the quiz timer in local storage */
  const getUser = async () => {
    try {
      await axios
        .post(
          "http://localhost:5000/user/userData",
          { id: user._id },
          {
            withCredentials: true,
          }
        )
        .then((data) =>                 /* setting the quiz time for the user*/
          localStorage.setItem("quizTime", JSON.stringify(data.data.quizTimer))
        )
        .then(() => {
          localStorageUser();   /* get the user details for the quiz session*/
        });
      return;
    } catch (error) {
      console.log(error);
    }
  };
  /* timer function */
  const timer = async () => {
    /* current date */
    const date = new Date();
    /* user's id */
    const id = user?._id;

    try {    /* update the timer of the user for the current quiz/session*/
      await axios
        .patch(
          "http://localhost:5000/user/addTimer",
          {
            id: id,
            start: date,  // setting current date and time to start the quiz
            end: addMinutes(date, 10), //setting the time to end in 10 min for the quiz(real time)
          },
          {
            withCredentials: true, // check if the user exists and stored in db 
          }
        )
        .then(() => getUser()); // if yes, get the user 
    } catch (error) { 
      console.log(error);
    }
  };

  useEffect(() => {  // render the user details once from the local storage
    localStorageUser();
  }, []);
/* function to show and close the register form , login form */
  const handleShowRegisterForm = () => {
    setOpenRegisterForm(true);
    setOpenLoginForm(false);
  };
/* function to show and close the register form , login form */
  const handleShowLoginForm = () => {
    setOpenRegisterForm(false);
    setOpenLoginForm(true);
  };

  return ( /* setting all the values in user context (global) */
    <UserContext.Provider
      value={{
        userData,
        error,
        user,
        setUser,
        handleLogout,
        getUser,
        timer,
        openRegisterForm,
        setOpenRegisterForm,
        openLoginForm,
        setOpenLoginForm,
        signIn,
        setSignIn,
        handleShowRegisterForm,
        handleShowLoginForm,
        visible, setVisible,
        localStorageUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserContextProvider };
