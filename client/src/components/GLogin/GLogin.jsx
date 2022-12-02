import axios from "axios";
import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function GLogin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/user/glogin/" + id);

      console.log("response:", response);
      if (response.data.success) {

        // add userdata to context
        setUser({...response.data.user})
       // console.log("the user in gloginis",...response.data.user)
        // redirect to home
        navigate('/')
    }
    };

    getData();
  }, []);

  return <div>Hello from glogin at client with id {id}</div>;
}
