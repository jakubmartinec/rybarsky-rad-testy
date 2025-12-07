import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { Ticket, ParkingLot } from '@/types';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: '40%',
    color: '#666',
  },
  value: {
    width: '60%',
    fontWeight: 'bold',
  },
  highlight: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 15,
    borderRadius: 5,
  },
  highlightText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    borderTop: 1,
    paddingTop: 10,
    fontSize: 10,
    color: '#999',
  },
  qrPlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: '#f0f0f0',
    marginVertical: 20,
    alignSelf: 'center',
  },
});

interface ParkingReceiptProps {
  ticket: Ticket;
  parkingLot: ParkingLot;
}

export default function ParkingReceipt({ ticket, parkingLot }: ParkingReceiptProps) {
  const formatDate = (timestamp: any) => {
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('cs-CZ', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(date);
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'CZK') {
      return `${amount} Kč`;
    }
    return `${amount} €`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Parkovací lístek</Text>
          <Text style={styles.subtitle}>{parkingLot.name}</Text>
        </View>

        {/* SPZ Highlight */}
        <View style={styles.highlight}>
          <Text style={styles.highlightText}>SPZ: {ticket.licensePlate}</Text>
        </View>

        {/* Platnost */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platnost lístku</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Platný od:</Text>
            <Text style={styles.value}>{formatDate(ticket.validFrom)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Platný do:</Text>
            <Text style={styles.value}>{formatDate(ticket.validUntil)}</Text>
          </View>
        </View>

        {/* Parkoviště */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Místo parkování</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Název:</Text>
            <Text style={styles.value}>{parkingLot.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Adresa:</Text>
            <Text style={styles.value}>{parkingLot.address}</Text>
          </View>
        </View>

        {/* Platba */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platba</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Částka:</Text>
            <Text style={styles.value}>
              {formatCurrency(ticket.price, ticket.currency)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Zaplaceno:</Text>
            <Text style={styles.value}>
              {ticket.paidAt ? formatDate(ticket.paidAt) : 'Nezaplaceno'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Číslo lístku:</Text>
            <Text style={styles.value}>{ticket.id}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Tento doklad slouží jako potvrzení o zaplacení parkování.</Text>
          <Text>Uchovejte jej po celou dobu parkování.</Text>
        </View>
      </Page>
    </Document>
  );
}
