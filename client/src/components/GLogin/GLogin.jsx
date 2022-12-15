import axios from "axios";
import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import BannerTiles from "../BannerTiles/BannerTiles";
import HomepageContent from "../HomepageContent/HomepageContent";

export default function GLogin() {
  /* getting the user id as params from the url */
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser, localStorageUser } = useContext(UserContext);

  /* getting the user details from the google server and redirecting the details to this page */
  const getData = async () => {
    const options = { withCredentials: true }; // to get the cookies---
    const response = await axios
      .get("/user/glogin/" + id, options)
      .then((data) =>
        localStorage?.setItem("user", JSON.stringify(data?.data?.user))
      )
      .then(() => {
        localStorageUser();
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <BannerTiles />
      <HomepageContent />
    </div>
  );
}
