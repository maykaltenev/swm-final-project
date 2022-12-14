import React, { useEffect, useState } from "react";
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
  const [hideViewButton, setHideViewButton] = useState(false);
  //function to hanlde preview button

  const handleView = () => {
    setCertificates(!certificates);
    setHideViewButton(!hideViewButton);
  };

  console.log("quiz in my doc", quiz);
  console.log("key", quiz.sessionId);
  return (
    <div className="container w-screen h-full dark:bg-nav-raisin-black-2 sm:w-[100%] flex flex-col mb-6 dark:text-black font-poppins justify-center items-center ">
      {quiz?.resultPercentage ? (
        <div
          className={`flex flex-col  p-2 w-screen sm:w-[80%] h-[50vh] ${
            hideViewButton
              ? "sm:h-[75vh] sm:flex-col "
              : "sm:h-[30vh]  sm:flex-row "
          } hover:shadow-xl  transition duration-300 dark:bg-oxford-blue shadow-5xl border-btn-majorelle-blue border-2  rounded-lg overflow-hidden flex justify-around items-center mb-5 `}
        >
          {/* Image and button */}
          <div className="flex w-screen  sm:w-2/5  p-2 justify-evenly sm:justify-around items-center">
            {/* Image */}
            <div className="w-[25%]  flex justify-center  items-center  ">
              <img
                className="w-[65%] sm:w-[100%]  "
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
            </div>
            {/* View Button */}
            {!hideViewButton ? (
              <button
                onClick={() => handleView(!hideViewButton)}
                className="px-12 rounded-xl cursor-pointer items-center justify-center bg-ultramarine-blue py-3 text-cyber-yellow hover:bg-ultramarine-blue-2  bg-ultramarine-blue "
              >
                View
              </button>
            ) : (
              <button
                onClick={() => handleView(!hideViewButton)}
                className="px-12 rounded-xl cursor-pointer items-center justify-center bg-ultramarine-blue py-3 text-cyber-yellow hover:bg-ultramarine-blue-2  bg-ultramarine-blue "
              >
                Hide
              </button>
            )}
          </div>

          {/* PDF certificate */}
          {certificates && (
            <PDFViewer className="h-3/4 sm:h-4/5 w-full">
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
          {/* Percentage Result */}
          {!certificates && (
            <div className="border-4 dark:border-cyber-yellow px-6 py-6 rounded-md dark:text-snow shadow-8xl">
              {quiz.resultPercentage} %
            </div>
          )}
          <PDFDownloadLink
            document={
              <Certificate
                date={quiz.createdOn}
                inputType={
                  quiz.quizType.charAt(0).toUpperCase() + quiz.quizType.slice(1)
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
                <div role="status ">
                  <svg
                    aria-hidden="true"
                    class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-800"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                <div>
                  <p className="dark:text-snow text-nav-raisin-black  text-italic mb-2">
                    Attempted On :{" "}
                    {new Date(quiz.createdOn).toLocaleString("de-DE")}
                  </p>
                  <button className="rounded  font-medium inline-flex w-full  items-center justify-center bg-ultramarine-blue px-6 py-3 text-cyber-yellow hover:bg-ultramarine-blue-2  bg-ultramarine-blue ">
                    Download now!
                  </button>
                </div>
              )
            }
          </PDFDownloadLink>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MyDocument;
