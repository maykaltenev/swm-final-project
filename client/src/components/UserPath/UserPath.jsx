import React, { useEffect } from "react";
import Collapsible from "../CollapsibleComponent/CollapsibleComponent";

function UserPath() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative">
      <Collapsible />
    </div>
  );
}

export default UserPath;
