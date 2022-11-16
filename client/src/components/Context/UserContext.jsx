import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import addMinutes from "date-fns/addMinutes";
import differenceInSeconds from "date-fns/differenceInSeconds";
import jwt_decode from "jwt-decode"
const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {

  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
/* ---------------google auth ---------------- */
const [googleUser, setGoogleUser] = useState({});

function handleCallbackResponse(response) {
console.log("Encoded JWT ID token:" + response.credential)
let userObject = jwt_decode(response.credential)
navigate("/")
setGoogleUser(userObject)
}

useEffect(() => {
  /* global google */
  google.accounts.id.initialize({
    client_id :"1094286495848-b0o394drtofdv1as2gfdchurcc9r9rrs.apps.googleusercontent.com" ,
    callback: handleCallbackResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    {theme:"outline", size:"large"}
   
  );
}, [])
/* ---------------google auth ---------------- */
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
  const timer = async () => {
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
  return (
    <UserContext.Provider
      value={{ userData, error, user, handleLogout, getUser, timer,googleUser, setGoogleUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserContextProvider };
