import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
/* import {
    BlobProvider,
    Document,
    Page,
    StyleSheet,
    Text,
    View
  } from "@react-pdf/renderer"; */

const styles = StyleSheet.create({
	page: {
		flexDirection: 'row',
	},
	section: {
		flexGrow: 1,
	},
});

export const MyDocument = ({name,inputType,sessionId,date,percentage}) => {
  return (  <Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text>Certificate</Text>
			</View>
            <View style={styles.section}>
				<Text>{sessionId}</Text>
			</View>
			<View style={styles.section}>
				<Text>{name}</Text>
			</View>
            <View style={styles.section}>
				<Text>{inputType}</Text>
			</View>
            <View style={styles.section}>
				<Text>{date}</Text>
			</View>
            <View style={styles.section}>
				<Text>{percentage}</Text>
			</View>
		</Page>
	</Document>
  )

}
	
