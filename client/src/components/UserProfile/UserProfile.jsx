import React from "react";
import Collapsible from "../CollapsibleComponent/CollapsibleComponent";

import QuizCard from "../QuizCard/QuizCard";
import SideBar from "../SideBar/SideBar";
function UserProfile() {
  return (
    <div className="relative">
      <SideBar />
      <QuizCard />
      <Collapsible />
    </div>
  );
}

export default UserProfile;
