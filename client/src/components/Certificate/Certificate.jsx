import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
/* 
  import {
    BlobProvider,
    Document,
    Page,
    StyleSheet,
    Text,
    View
  } from "@react-pdf/renderer";
   */
import Logo from "../../assets/MERN+.png";
export const MyDocument = ({
  name,
  inputType,
  sessionId,
  date,
  percentage,
}) => {
  return (
    <Document>
      <Page size="A4" className=" flex flex-col">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={Logo}
          alt="blog"
        />
        <View>
          <Text className="text ">Certificate</Text>
        </View>
        <View>
          <Text>{sessionId}</Text>
        </View>
        <View>
          <Text>{name}</Text>
        </View>
        <View>
          <Text>{inputType}</Text>
        </View>
        <View>
          <Text>{date}</Text>
        </View>
        <View>
          <Text>{percentage}</Text>
        </View>
      </Page>
    </Document>
  );
};
