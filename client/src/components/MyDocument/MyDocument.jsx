import React, { useContext, useState } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
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
  <h5>My Certificates</h5>
  {quizHistory.quizResults &&
            quizHistory.quizResults.map((quiz) => (
              quiz.resultPercentage ? 
              <>
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
        </PDFDownloadLink> </>
             :
             ""
           
            ))
            }
           
  {/*  <Document style={styles.document}>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
     
    </Page>
  </Document>  */}
  
 </>
  )
};

export default MyDocument;
