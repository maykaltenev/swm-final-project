import React, { useContext, useState } from "react";
import { Document, Page, Text, View,Image, StyleSheet } from "@react-pdf/renderer";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import {Certificate} from "../Certificate/Certificate"
import { UserContext } from "../Context/UserContext";
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
  document:{
    /* maxHeight: "1200", */
    overflowY: "auto" 
  }
});

// Create Document Component
const MyDocument = () => {
  const{user}= useContext(UserContext);

  const getQuizHistoryFromLocalStorage = () => {
    const quizHistory = localStorage.getItem("user");
    if (quizHistory) {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return [];
    }
  };
  const [quizHistory, setQuizHistory] = useState(
    getQuizHistoryFromLocalStorage
  );
  return(
  <>
  <h1 className="text-center text-xl dark:text-snow mb-5"><b>My Certificates</b></h1>
  <div className="container flex mb-6 dark:text-black py-26 font-poppins justify-center ">

  {quizHistory.quizResults &&
            quizHistory.quizResults.map((quiz) => (
              quiz.resultPercentage ? 
              <div className="p-4 sm:w-5/6 hover:shadow-xl hover:scale-105  transition duration-300 h-full dark:bg-oxford-blue border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden flex justify-around items-center">
                <img className="m-5" width="150" src={quiz?.quizType === "javascript"
                ? jsimg
                : quiz?.quizType === "react"
                ? reactimg
                : quiz?.quizType === "express"
                ? expressimg
                : quiz?.quizType === "mongodb"
                ? mongodbimg
                : quiz?.quizType === "nodejs"
                ? nodeimg
                : ""} alt=""/>
               <PDFViewer>
                <Certificate
                date={quiz.createdOn} 
                inputType={quiz.quizType} 
                sessionId={quiz.sessionId}
                 name={`${user.firstName} ${user.lastName } `} 
                 percentage={quiz.resultPercentage}
                 inputTypeImage={quiz?.quizType === "javascript"
                ? jsimg
                : quiz?.quizType === "react"
                ? reactimg
                : quiz?.quizType === "express"
                ? expressimg
                : quiz?.quizType === "mongodb"
                ? mongodbimg
                : quiz?.quizType === "nodejs"
                ? nodeimg
                : ""}
                />
                 </PDFViewer>
              <PDFDownloadLink document={<Certificate
                date={quiz.createdOn} 
                inputType={quiz.quizType.charAt(0).toUpperCase() + quiz.quizType.slice(1)} 
             inputTypeImage={quiz?.quizType === "javascript"
             ? jsimg
             : quiz?.quizType === "react"
             ? reactimg
             : quiz?.quizType === "express"
             ? expressimg
             : quiz?.quizType === "mongodb"
             ? mongodbimg
             : quiz?.quizType === "nodejs"
             ? nodeimg
             : ""}
                sessionId={quiz.sessionId}
                 name={`${user.firstName} ${user.lastName} `} 
                 percentage={quiz.resultPercentage}/> } fileName="certificate.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : <button className="pointer-cursor bg-btn-majorelle-blue border-2 border-bg-menu-dark-silver-metallic py-2 px-6 rounded hover:bg-link-violet-blue">Download now!</button>
          }
        </PDFDownloadLink> </div>
             :
             ""
           
            ))
            }
         
    </div> 
 </>
  )
};

export default MyDocument;

{/*  <Document style={styles.document}>
  <Page size="A4" style={styles.page}>
    <View style={styles.section}>
      <Text>Section #1</Text>
    </View>
   
  </Page>
</Document>  */}