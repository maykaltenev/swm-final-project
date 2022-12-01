import React from "react";
import { Link } from "react-router-dom";

import Banner from "../Banner/Banner";
import HomepageContent from "../HomepageContent/HomepageContent";

function Home() {
  return (
    <div className="dark:text-white dark:bg-bg-xiketic">
      <Link to={"/quizhistory"}>Quiz History</Link>
      <div>
        <Banner />
        <HomepageContent />
      </div>
    </div>
  );
}

export default Home;
