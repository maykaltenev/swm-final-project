import React from "react";
import Stream from "../../assets/stream.png";
import Computer from "../../assets/computer.png";

function HomepageContent() {
  return (
    <>
      <section className=" text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center ">
          <div className="lg:max-w-lg md:w-3/5  mb-10 md:mb-0 ">
            <img
              className="object-cover object-center rounded w-full h-80"
              alt="hero"
              src={Stream}
            />
          </div>
          <div className="lg:flex-grow p-8 md:w-2/5 md:pl-16 border-2 flex align-center flex-col  bg-oxford-blue  rounded-xl border-y border-link-cyber-yellow">
            <div className="flex flex-col text-center items-center">
              <h1 className="title-font sm:w-2/4 sm:text-center sm:text-4xl text-3xl mb-4 font-medium text-ultramarine-blue-2 ">
                Hands-on coding environments
              </h1>
              <p className="mb-8 leading-relaxed dark:text-snow md:w-2/4">
                Our mission is to help you improve yourself in MERN stack by
                practicing our Quizzes. Practice will help you to get rid of
                fear in attending interviews and you can land your dream Job.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center justify-center">
          <div className="lg:flex-grow p-8 md:w-2/5 md:pl-16  align-center flex-col  bg-oxford-blue  rounded-xl border-y border-link-cyber-yellow">
            <div className="flex flex-col text-center items-center">
              <h1 className="title-font sm:w-2/4 sm:text-center sm:text-4xl text-3xl mb-4 font-medium text-ultramarine-blue-2 ">
                Hands-on coding environments
              </h1>
              <p className="mb-8 leading-relaxed dark:text-snow md:w-2/4">
                Our mission is to help you improve yourself in MERN stack by
                practicing our Quizzes. Practice will help you to get rid of
                fear in attending interviews and you can land your dream Job.
              </p>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 ">
            <img
              className="object-cover object-left-bottom rounded w-full h-80"
              alt="hero"
              src={Computer}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomepageContent;
