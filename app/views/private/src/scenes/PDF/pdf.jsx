import React, {Component} from "react";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const PdfReport = ({ title, data }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    container: {
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.title}>{title} Report</Text>
        </View>
        {data.map((item) => (
          <View style={styles.container} key={item.id_producto}>
            <Text style={styles.text}>Name: {item.nombre}</Text>
            <Text style={styles.text}>Lastnames: {item.apellido}</Text>
            <Text style={styles.text}></Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default PdfReport;