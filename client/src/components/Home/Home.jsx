import React from "react";

import Banner from "../Banner/Banner";
import BannerTiles from "../BannerTiles/BannerTiles";
import HomepageContent from "../HomepageContent/HomepageContent";

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
