import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Home() {
  return (
    <div>
      <Header />
      <Link to={"/quizhistory"}>Quiz History</Link>
    </div>
  );
}

export default Home;
