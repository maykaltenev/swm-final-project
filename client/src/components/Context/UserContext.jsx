import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import addMinutes from "date-fns/addMinutes";
import differenceInSeconds from "date-fns/differenceInSeconds";
const UserContext = createContext(null);
const UserContextProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

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
        )
        .then((data) =>
          localStorage.setItem("user", JSON.stringify(data.data.user))
        )
        .then(() => {
          localStorageUser();
        });
      setError("");
      navigate("/mypage");
      return;
    } catch (error) {
      console.log(error);
      setError(" The email address or password is incorrect ");
    }
  };
  const handleLogout = async () => {
    try {
      await axios
        .get("http://localhost:5000/user/logout", {
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
    const quizTimer = JSON.parse(localStorage.getItem("quizTime"));
    setUser(user);

    return;
  };

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
  const timer = async (examTime) => {
    const date = new Date();
    const quizTimer = JSON.parse(localStorage.getItem("quizTime"));
    const id = user?._id;

    try {
      await axios
        .patch(
          "http://localhost:5000/user/addTimer",
          {
            id: id,
            start: date,
            end: addMinutes(date, examTime),
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
  return (
    <UserContext.Provider
      value={{ userData, error, user, handleLogout, getUser, timer }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserContextProvider };
