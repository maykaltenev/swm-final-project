import React, { useState } from "react";
import { StyleSheet } from "@react-pdf/renderer";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Certificate } from "../Certificate/Certificate";

//images
import reactimg from "../../assets/reactimg.png";
import mongodbimg from "../../assets/mongodbimg.png";
import jsimg from "../../assets/jsimg.png";
import expressimg from "../../assets/expressimg.png";
import nodeimg from "../../assets/nodeimg.png";
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  document: {
    overflowY: "auto",
  },
});

// Create Document Component
const MyDocument = ({ quiz, user }) => {
  const [certificates, setCertificates] = useState(false);
const [hideViewButton,setHideViewButton] = useState(false)
  //function to hanlde preview button
  const handleView = () => {
    setCertificates(!certificates);
    setHideViewButton(!hideViewButton)

  };
  console.log("quiz in my doc", quiz);
  return (
    <div className="font-poppins ">
    
      <div className="container  flex flex-col mb-6 dark:text-black py-26 font-poppins justify-center items-center ">
        {quiz.resultPercentage ? (
          <div className="p-4 sm:w-5/6 hover:shadow-xl hover:scale-100  transition duration-300 h-full dark:bg-oxford-blue border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden flex justify-around items-center mb-5">
            <img
              className="m-5"
              width="100"
              src={
                quiz?.quizType === "javascript"
                  ? jsimg
                  : quiz?.quizType === "react"
                  ? reactimg
                  : quiz?.quizType === "express"
                  ? expressimg
                  : quiz?.quizType === "mongodb"
                  ? mongodbimg
                  : quiz?.quizType === "nodejs"
                  ? nodeimg
                  : ""
              }
              alt=""
            />
            <button
              onClick={() =>handleView(!hideViewButton)}
              className="rounded cursor-pointer md:p-3 font-medium inline-flex  items-center justify-center bg-ultramarine-blue px-6 py-3 text-cyber-yellow hover:bg-ultramarine-blue-2  bg-ultramarine-blue "
            >
              {" "}
              View
            </button>
            {certificates && (
              <PDFViewer>
                <Certificate
                  date={quiz?.createdOn}
                  inputType={quiz.quizType}
                  sessionId={quiz.sessionId}
                  name={`${user.firstName} ${user.lastName} `}
                  percentage={quiz.resultPercentage}
                  inputTypeImage={
                    quiz?.quizType === "javascript"
                      ? jsimg
                      : quiz?.quizType === "react"
                      ? reactimg
                      : quiz?.quizType === "express"
                      ? expressimg
                      : quiz?.quizType === "mongodb"
                      ? mongodbimg
                      : quiz?.quizType === "nodejs"
                      ? nodeimg
                      : ""
                  }
                />
              </PDFViewer>
            )}
            <PDFDownloadLink
              document={
                <Certificate
                  date={quiz.createdOn}
                  inputType={
                    quiz.quizType.charAt(0).toUpperCase() +
                    quiz.quizType.slice(1)
                  }
                  inputTypeImage={
                    quiz?.quizType === "javascript"
                      ? jsimg
                      : quiz?.quizType === "react"
                      ? reactimg
                      : quiz?.quizType === "express"
                      ? expressimg
                      : quiz?.quizType === "mongodb"
                      ? mongodbimg
                      : quiz?.quizType === "nodejs"
                      ? nodeimg
                      : ""
                  }
                  sessionId={quiz.sessionId}
                  name={`${user.firstName} ${user.lastName} `}
                  percentage={quiz.resultPercentage}
                />
              }
              fileName="certificate.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  "Loading document..."
                ) : (
                  <div>
                    <p className="mb-5">
                      Attempted On :{" "}
                      {new Date(quiz.createdOn).toLocaleString("de-DE")}
                    </p>
                    <button className="rounded md:w-3/4 md:p-3 font-medium inline-flex w-full sm:w-1/3 items-center justify-center bg-ultramarine-blue px-6 py-3 text-cyber-yellow hover:bg-ultramarine-blue-2  bg-ultramarine-blue ">
                      Download now!
                    </button>
                  </div>
                )
              }
            </PDFDownloadLink>{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MyDocument;


