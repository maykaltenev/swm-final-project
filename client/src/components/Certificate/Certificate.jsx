import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Logo from "../../assets/MERN+.png";
// Create styles
const styles = StyleSheet.create({
  page: {
    overflowX: "hidden",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  pageBorder: {
    border: "solid",
    borderColor: "Black",
    borderWidth: "5",
  },
  certificateBorder: {
    margin: "20",
    border: "solid",
    borderColor: "gray",
    borderWidth: "2",
  },
  imageWidth: {
    width: "50",
    height: "50",
  },
  heading: {
    fontWeight: "bold",
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  lineSpacing: {
    lineHeight: "2",
    margin: "25",
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "50",
    fontWeight: "900",
  },
  textSpacing: {
    lineHeight: "2",
    lineSpacing: "3",
    margin: "25",
  },
  inputTypeImageStyle: {
    width: "150",
    height: "150",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "70",
  },
});

export const Certificate = ({
  name,
  inputType,
  sessionId,
  date,
  percentage,
  inputTypeImage,
}) => {
  return (
    <>
      <Document>
        <Page size="A4">
          <View style={styles.certificateBorder}>
            <View style={styles.header}>
              <Image style={styles.imageWidth} src={Logo}></Image>
              <Text style={styles.heading}>Certificate of Completion</Text>
            </View>
            <View>
              <Text style={styles.textSpacing}>
                This is to certify that {name} has successfully completed the
                requirements and has the knowledge and skills to be recognized
                as {inputType} Developer
              </Text>
              <Image
                src={inputTypeImage}
                style={styles.inputTypeImageStyle}
              ></Image>
            </View>

            <View>
              <Text style={styles.lineSpacing}>
                Certification Id: {sessionId}
              </Text>
            </View>
            <View>
              <Text style={styles.lineSpacing}>Date of Issue: {new Date(date).toLocaleString("de-DE")}</Text>
            </View>
            <View>
              <Text style={styles.lineSpacing}>
                Percentage Scored is: {percentage} %
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};
