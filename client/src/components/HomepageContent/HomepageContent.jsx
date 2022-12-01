import React from 'react'
import Stream from "../../assets/stream.png"
import Computer from "../../assets/computer.png"

function HomepageContent() {
  return (
    <>
<section className=" text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 ">
      <img className="object-cover object-center rounded-3xl w-full h-80" alt="hero" src={Stream}/>
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Hands-on coding environments
       
      </h1>
      <p className="mb-8 leading-relaxed text">Our mission is to help you improve yourself in MERN stack by practicing our Quizzes. Practice will help you to get rid of fear in attending interviews and you can land your dream Job.</p>
     
    </div>
  </div>
</section>

<div className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
   
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Hands-on coding environments
       
      </h1>
      <p className="mb-8">Our mission is to help you improve yourself in MERN stack by practicing our Quizzes. Practice will help you to get rid of fear in attending interviews and you can land your dream Job.</p>
     
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 ">
      <img className="object-cover object-left-bottom rounded-3xl w-full h-80" alt="hero" src={Computer}/>
    </div>
  </div>
</div>
</>
  )
}

export default HomepageContent