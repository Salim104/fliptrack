import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import type { Sale, StockItem } from '@prisma/client'

const conditionLabel: Record<string, string> = {
  BRAND_NEW: 'Brand New',
  LIKE_NEW: 'Like New',
  GOOD: 'Good',
  FAIR: 'Fair',
  POOR: 'Poor',
}

const paymentLabel: Record<string, string> = {
  CASH: 'Cash',
  EFT: 'EFT',
  SNAPSCAN: 'SnapScan',
  YOCO: 'Yoco',
  OTHER: 'Other',
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingBottom: 16,
  },
  brand: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#555555',
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#888888',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 10,
    color: '#555555',
  },
  value: {
    fontSize: 10,
    color: '#000000',
    fontFamily: 'Helvetica-Bold',
  },
  profitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },
  profitLabel: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
  },
  profitValue: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#00AA55',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 16,
  },
  footerText: {
    fontSize: 10,
    color: '#888888',
  },
  footerDate: {
    fontSize: 9,
    color: '#BBBBBB',
    marginTop: 4,
  },
})

const zarFormat = (n: number) =>
  new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', minimumFractionDigits: 0 }).format(n)

interface Props {
  sale: Sale & { stockItem: StockItem }
}

export default function SaleReceipt({ sale }: Props) {
  const profit = sale.salePrice - sale.stockItem.costPrice
  const saleDate = new Date(sale.createdAt).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const generatedAt = new Date().toLocaleString('en-ZA')

  return (
    <Document>
      <Page size="A5" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brand}>FlipTrack</Text>
          <Text style={styles.subtitle}>Sales Receipt</Text>
        </View>

        {/* Buyer Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Buyer Info</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{sale.buyerName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>{sale.buyerPhone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date of Sale</Text>
            <Text style={styles.value}>{saleDate}</Text>
          </View>
        </View>

        {/* Phone Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phone Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Model</Text>
            <Text style={styles.value}>{sale.stockItem.model}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Storage</Text>
            <Text style={styles.value}>{sale.stockItem.storage}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Color</Text>
            <Text style={styles.value}>{sale.stockItem.color}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Condition</Text>
            <Text style={styles.value}>{conditionLabel[sale.stockItem.condition] ?? sale.stockItem.condition}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>IMEI</Text>
            <Text style={styles.value}>{sale.stockItem.imei}</Text>
          </View>
        </View>

        {/* Transaction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Method</Text>
            <Text style={styles.value}>{paymentLabel[sale.paymentMethod] ?? sale.paymentMethod}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Cost Price</Text>
            <Text style={styles.value}>{zarFormat(sale.stockItem.costPrice)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sale Price</Text>
            <Text style={styles.value}>{zarFormat(sale.salePrice)}</Text>
          </View>
          <View style={styles.profitRow}>
            <Text style={styles.profitLabel}>Profit</Text>
            <Text style={styles.profitValue}>+{zarFormat(profit)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for your business</Text>
          <Text style={styles.footerDate}>Generated: {generatedAt}</Text>
        </View>
      </Page>
    </Document>
  )
}
