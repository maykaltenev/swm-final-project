import React, { useEffect } from "react";
import Collapsible from "../CollapsibleComponent/CollapsibleComponent";

import QuizCard from "../QuizCard/QuizCard";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
function UserProfile() {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative">
      <QuizCard />
      <Collapsible />
    </div>
  );
}

export default UserProfile;
