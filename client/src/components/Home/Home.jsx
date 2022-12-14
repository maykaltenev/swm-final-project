import React from "react";
// import React, { useEffect } from "react";
import BannerTiles from "../BannerTiles/BannerTiles";
import Footer from "../Footer/Footer";
import HomepageContent from "../HomepageContent/HomepageContent";

function Home() {
  return (
    <div>
      <div>
        <BannerTiles />
        <HomepageContent />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
