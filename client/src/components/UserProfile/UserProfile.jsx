import React, { useEffect } from "react";
import Collapsible from "../CollapsibleComponent/CollapsibleComponent";

import QuizCard from "../QuizCard/QuizCard";
import SideBar from "../SideBar/SideBar";
function UserProfile() {
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
