import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 30 },
  row: { flexDirection: 'row', marginBottom: 10 },
  label: { width: 100 },
  value: { flex: 1 },
});

const InvoiceTemplate = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Factura</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{data.short_name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Arrendatario:</Text>
        <Text style={styles.value}>{data.name_arrendatario}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>NIF:</Text>
        <Text style={styles.value}>{data.nif}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Euros:</Text>
        <Text style={styles.value}>{data.euros}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>IRPF:</Text>
        <Text style={styles.value}>{data.irpf}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>IVA:</Text>
        <Text style={styles.value}>{data.iva}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total:</Text>
        <Text style={styles.value}>{data.total}</Text>
      </View>
    </Page>
  </Document>
);

export default InvoiceTemplate;
