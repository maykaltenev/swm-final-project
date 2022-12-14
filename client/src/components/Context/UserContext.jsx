import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import addMinutes from "date-fns/addMinutes";

const UserContext = createContext(null);
const UserContextProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  //open register form when join us button in header is clicked
  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  //when a user is loggedin after auth
  const [openLoginForm, setOpenLoginForm] = useState(false);
  //sign in the right user from db
  const [signIn, setSignIn] = useState({});
  //for eye icon in password
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const userData = async (formData) => {
    try {
      await axios
        .post(
          process.env.REACT_APP_BASE_URL + "/user/login",
          {
            email: formData.get("email"),
            password: formData.get("password"),
          },
          {
            withCredentials: true,
          }
        )
        .then((data) =>
          localStorage.setItem("user", JSON.stringify(data.data.user))
        )
        .then(() => {
          localStorageUser();
        });
      setError("");
      navigate("/");
      return;
    } catch (error) {
      console.log(error);
      setError(" The email address or password is incorrect ");
    }
  };
  const handleLogout = async () => {
    try {
      await axios
        .get(process.env.REACT_APP_BASE_URL + "/user/logout", {
          withCredentials: true,
        })
        .then(() => {
          setUser("");
        })
        .then(localStorage.clear("user"))
        .then(() => navigate("/"));
    } catch (error) {
      console.log(error);
    }
  };
  const localStorageUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    setUser(user);

    return;
  };

  const getUser = async () => {
    try {
      await axios
        .post(
          process.env.REACT_APP_BASE_URL + "/user/userData",
          { id: user?._id },
          {
            withCredentials: true,
          }
        )
        .then((data) =>
          localStorage.setItem("quizTime", JSON.stringify(data.data.quizTimer))
        )
        .then(() => {
          localStorageUser();
        });
      return;
    } catch (error) {
      console.log(error);
    }
  };
  const timer = async () => {
    const date = new Date();
    const id = user?._id;

    try {
      await axios
        .patch(
          process.env.REACT_APP_BASE_URL + "/user/addTimer",
          {
            id: id,
            start: date,
            end: addMinutes(date, 10),
          },
          {
            withCredentials: true,
          }
        )
        .then(() => getUser());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorageUser();
  }, []);

  const handleShowRegisterForm = () => {
    setOpenRegisterForm(true);
    setOpenLoginForm(false);
  };

  const handleShowLoginForm = () => {
    setOpenRegisterForm(false);
    setOpenLoginForm(true);
  };

  return (
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
        visible,
        setVisible,
        localStorageUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserContextProvider };
