import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import HomepageContent from "../HomepageContent/HomepageContent";

function Home() {
  
  return (
    <div>
      <Header />
      <Link to={"/quizhistory"}>Quiz History</Link>
      <div>
        <Banner />
        <HomepageContent />
      </div>
    </div>
  );
}

export default Home;
