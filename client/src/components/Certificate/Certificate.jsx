import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Logo from "../../assets/MERN+.png";
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
  border: {
    border: "solid",
    borderColor: "red",
    borderWidth: "20",
  },
});

export const MyDocument = ({
  name,
  inputType,
  sessionId,
  date,
  percentage,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.border}>
        <Image src={Logo}></Image>
        <View className="text-center">
          <Text className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white ">
            Certificate of Completion
          </Text>
        </View>

        <View>
          <Text className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            This is to certify that {name} has successfully completed the
            requirements and has the knowledge and skills to be recognized as{" "}
            {inputType} Developer
          </Text>
        </View>
        <View>
          <Text className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Certification Id: {sessionId}
          </Text>
        </View>
        <View>
          <Text className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Date of Issue: {date}
          </Text>
        </View>
        <View>
          <Text className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Percentage Scored is: {percentage} %
          </Text>
        </View>
      </Page>
    </Document>
  );
};
