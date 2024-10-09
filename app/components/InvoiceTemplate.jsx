import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: '#fcfcf4', fontFamily: 'Helvetica' },
  table: { display: 'table', width: 'auto', borderStyle: 'solid', borderColor: '#8cac7c', borderWidth: 1 },
  tableRow: { flexDirection: 'row', borderBottomColor: '#8cac7c', borderBottomWidth: 1 },
  tableCol: { borderRightColor: '#8cac7c', borderRightWidth: 1, padding: 5 },
  tableCell: { margin: 'auto', marginTop: 5, marginBottom: 5, fontSize: 10, color: '#5c5444', textAlign: 'center' },
  tableCellTitle: { fontSize: 13, fontWeight: 'bold', color: '#5c5444', textAlign: 'center' },
  rightAlign: { textAlign: 'right' },
  fullWidth: { width: '100%' },
  halfWidth: { width: '50%' },
  thirdWidth: { width: '33.33%' },
  twoThirdsWidth: { width: '66.67%' },
  smallText: {
    fontSize: 8,
    marginTop: 2, // Adds a small gap between the title and the ref_catastral
  },
});

const getCurrentMonth = () => {
  const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  return months[new Date().getMonth()];
};

const getCurrentDate = () => {
  const date = new Date();
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

const formatCurrency = (value) => {
  return `${value.toFixed(2)}€`;
};

const InvoiceTemplate = ({ data, activePage }) => {
  console.log('InvoiceTemplate - activePage:', activePage);

  const propietario = activePage === 'info-manager-Beatriz' 
    ? 'Beatriz García Fernández'
    : 'María Jesus y Beatriz García CB';

  console.log('InvoiceTemplate - propietario:', propietario);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.thirdWidth]}>
              <Text style={styles.tableCellTitle}>Recibo Nº</Text>
              <Text style={styles.tableCell}>
                {`${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${data.sc}`}
              </Text>
            </View>
            <View style={[styles.tableCol, styles.thirdWidth]}>
              <Text style={styles.tableCellTitle}>Localidad de Expedición</Text>
              <Text style={styles.tableCell}>León</Text>
            </View>
            <View style={[styles.tableCol, styles.thirdWidth]}>
              <Text style={styles.tableCellTitle}>Total</Text>
              <Text style={styles.tableCell}>{formatCurrency(data.total)}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.halfWidth]}>
              <Text style={styles.tableCellTitle}>Expedición</Text>
              <Text style={styles.tableCell}>{getCurrentDate()}</Text>
            </View>
            <View style={[styles.tableCol, styles.halfWidth]}>
              <Text style={styles.tableCellTitle}>Fecha de Vencimiento</Text>
              <Text style={styles.tableCell}>A la vista</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.fullWidth]}>
              <Text style={styles.tableCellTitle}>ARRENDAMIENTO FINCA {data.short_name}</Text>
              <Text style={[styles.tableCell, styles.smallText]}>Ref. Catastral: {data.ref_catastral || 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.halfWidth]}>
              <Text style={styles.tableCellTitle}>Conceptos</Text>
              <Text style={styles.tableCell}>RENTA BASE</Text>
            </View>
            <View style={[styles.tableCol, styles.halfWidth]}>
              <Text style={styles.tableCellTitle}>Cantidad</Text>
              <Text style={styles.tableCell}>{formatCurrency(data.euros)}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.halfWidth]}>
              <Text style={styles.tableCellTitle}>Conceptos</Text>
              <Text style={styles.tableCell}>RET. A CTA. IRPF 19,00%</Text>
              <Text style={styles.tableCell}>IVA 21%</Text>
            </View>
            <View style={[styles.tableCol, styles.halfWidth]}>
              <Text style={styles.tableCellTitle}>Cantidad</Text>
              <Text style={styles.tableCell}>{formatCurrency(data.irpf)}</Text>
              <Text style={styles.tableCell}>{formatCurrency(data.iva)}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.fullWidth]}>
              <Text style={styles.tableCellTitle}>CUENTA DE CARGO</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.thirdWidth]}>
              <Text style={styles.tableCellTitle}>ARRENDATARIO:</Text>
              <Text style={styles.tableCell}>{data.name_arrendatario}</Text>
              <Text style={styles.tableCell}>{data.short_name}</Text>
              <Text style={styles.tableCell}>N.I.F. O</Text>
              <Text style={styles.tableCell}>D.N.I. {data.nif}</Text>
            </View>
            <View style={[styles.tableCol, styles.thirdWidth]}>
              <Text style={styles.tableCellTitle}>PROPIETARIO:</Text>
              <Text style={styles.tableCell}>
                {propietario}
              </Text>
              <Text style={styles.tableCell}>C/Las Fuentes Nº 1 4º G</Text>
              <Text style={styles.tableCell}>León</Text>
              <Text style={styles.tableCell}>N.I.F. O</Text>
              <Text style={styles.tableCell}>D.N.I. 9763953Q</Text>
            </View>
            <View style={[styles.tableCol, styles.thirdWidth]}>
              <Text style={styles.tableCellTitle}>RECIBÍ:</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceTemplate;
