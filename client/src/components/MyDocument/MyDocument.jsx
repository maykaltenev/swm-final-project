import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import {Certificate} from "../Certificate/Certificate"

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
const MyDocument = () => (
  <>
  {/*  <Document style={styles.document}>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
     
    </Page>
  </Document>  */}
  <PDFViewer document={<Certificate/>}></PDFViewer>
  <PDFDownloadLink document={<Certificate/>} fileName="certificate.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : <button className="pointer-cursor bg-btn-majorelle-blue border-2 border-bg-menu-dark-silver-metallic py-2 px-6 rounded hover:bg-link-violet-blue">Download now!</button>}</PDFDownloadLink>
  </>
);

export default MyDocument;
