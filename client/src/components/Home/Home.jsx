import React from "react";

import Banner from "../Banner/Banner";
import BannerTiles from "../BannerTiles/BannerTiles";
import HomepageContent from "../HomepageContent/HomepageContent";
import SideBar from "../SideBar/SideBar";

function Home() {
  return (
    <div>
      <div>
        {/* <Banner />
         */}
        <BannerTiles />
        <HomepageContent />
      </div>
    </div>
  );
}

export default Home;
