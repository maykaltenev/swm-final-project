import axios from "axios";
import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function GLogin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser, localStorageUser } = useContext(UserContext);

  const getData = async () => {
    const options = { withCredentials: true }; // to get the cookies---

    const response = await axios
      .get("/user/glogin/" + id, options)
      .then((data) =>
        localStorage.setItem("user", JSON.stringify(data?.data?.user))
      )
      .then(() => {
        localStorageUser();
      });
  };
  
  useEffect(() => {
    getData();
  }, []);

  return <div>Hello from glogin at client with id {id}</div>;
}
