import React, { ReactElement } from "react";
import type { FC } from "react";
import { PDFDownloadLink, Text, StyleSheet, View, Document, Page, Font } from "@react-pdf/renderer";
import { IClient } from "../../../interfaces/client/client.interface";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
});

interface PDFProps {
  clients: IClient[];
  filters: string[];
}

// Define styles with TypeScript types
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    fontFamily: "Roboto"
  },
  title: {
    fontSize: 24,
    textAlign: "center"
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey"
  },
  table: {
    width: "100%",
    marginVertical: 10
  },
  tableRow: {
    flexDirection: "row"
  },
  tableCell: {
    flex: 1,
    padding: 5,
    border: "1px solid #000",
    width: "33%"
  }
});

const PDFDocument: FC<PDFProps> = ({ clients, filters }): ReactElement => (
  <Document>
    <Page size="A4" style={styles.page}>
      {filters.length > 0 ? (
        <Text style={styles.title} fixed>
          Lista zgloszeń na {filters[0]}
        </Text>
      ) : null}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text>Imię i Nazwisko</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>Email</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>Tel</Text>
          </View>
        </View>
        {clients?.length
          ? clients.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>{row.name}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{row.email}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{row.tel}</Text>
                </View>
              </View>
            ))
          : null}
      </View>
    </Page>
  </Document>
);

export const DownloadPDFButton: FC<PDFProps> = ({ clients, filters }) => {
  return (
    <div>
      <PDFDownloadLink document={<PDFDocument clients={clients} filters={filters} />} fileName="zgloszenia.pdf">
        {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
};
