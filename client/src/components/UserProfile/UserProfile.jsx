import React from "react";
import Collapsible from "../CollapsibleComponent/CollapsibleComponent";
import SideBar from "../SideBar/SideBar";
function UserProfile() {
  return (
    <div className="relative">
      <SideBar />
      <Collapsible />
    </div>
  );
}

export default UserProfile;
