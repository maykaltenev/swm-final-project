import React from "react";
import Cover from "../../assets/cover.png";
function Banner() {
  return (
    <section className="text-gray-600 body-font">
      <div className="bg-cover bg-center ">
        <img className="w-full h-96" src={Cover} alt="" />
       
      </div>
    </section>
  );
}

export default Banner;
