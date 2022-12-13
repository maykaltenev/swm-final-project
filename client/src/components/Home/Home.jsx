import React, { useEffect } from "react";
import BannerTiles from "../BannerTiles/BannerTiles";
import HomepageContent from "../HomepageContent/HomepageContent";
import axios from "axios";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
function Home() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser, localStorageUser } = useContext(UserContext);

  const getData = async () => {
    const options = { withCredentials: true }; // to get the cookies---

    const response = await axios
      .get("/user/userprofile/" + id, options)
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
  return (
    <div>
      <div>
        <BannerTiles />
        <HomepageContent />
      </div>
    </div>
  );
}

export default Home;
