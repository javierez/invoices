# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an invoice management system built with Next.js 14 for generating and emailing PDF invoices for rental properties. The application handles three types of invoices:
- Facturas Beatriz (individual invoices)
- Facturas Compartidas Sin Gastos (shared invoices without expenses)
- Facturas Compartidas Gastos (shared invoices with expenses)

## Commands

```bash
# Development
npm run dev         # Start development server on http://localhost:3000

# Production
npm run build       # Build for production
npm run start       # Start production server

# Code Quality
npm run lint        # Run ESLint
```

## Architecture

### Tech Stack
- **Next.js 14.2.8** with App Router
- **React 18** with JSX (not TypeScript despite tsconfig.json)
- **Tailwind CSS** with custom color scheme (cream, sage, brown, gold, offwhite, mint, forest)
- **@react-pdf/renderer** for PDF generation
- **Nodemailer** for email sending
- **xlsx** for Excel file processing

### Directory Structure
```
app/
├── api/                    # API routes for PDF generation and email sending
│   ├── generate-pdfs/      # Regular invoice PDF generation
│   ├── generate-pdfs-gastos/ # Expense invoice PDF generation
│   ├── send-pdfs/          # Regular invoice email sending
│   └── send-pdfs-gastos/   # Expense invoice email sending
├── components/             # Main components
│   ├── InvoiceTemplate.jsx # Regular invoice PDF template
│   ├── InvoiceTemplate-Gastos.jsx # Expense invoice PDF template
│   └── PDFGenerator*.jsx   # PDF generation logic
├── ui/                     # UI components (buttons, tables, menus)
├── lib/                    # Data utilities
│   ├── data.tsx           # Regular invoice data handling
│   └── dataGastos.tsx     # Expense invoice data handling
└── [pages]/               # Page routes (login, info-manager-*)
```

### Key Architectural Patterns

1. **Authentication**: Simple localStorage-based auth (checks for 'isAuthenticated' key)
2. **Data Flow**: Excel files (stored in Google Cloud Storage) → API routes → PDF generation → Email sending
3. **Invoice Types**: Different proprietors have different tax IDs:
   - Beatriz García Fernández (NIF: individual tax ID)
   - María Jesus y Beatriz García CB (CIF: business tax ID)
4. **State Management**: React's built-in state (no Redux/Context API)
5. **Styling**: Tailwind CSS with consistent color scheme across components

### Environment Variables

Required in `.env.local`:
```
EMAIL_HOST=...
EMAIL_PORT=...
EMAIL_USER=...
EMAIL_PASS=...
EXCEL_FILE_BEATRIZ=...
EXCEL_FILE_COMPARTIDAS=...
EXCEL_FILE_GASTOS=...
```

### API Endpoints

All API routes handle Excel file processing, PDF generation, and email sending:
- `POST /api/generate-pdfs` - Generate PDFs for selected regular invoices
- `POST /api/generate-pdfs-gastos` - Generate PDFs for selected expense invoices
- `POST /api/send-pdfs` - Send emails with PDF attachments for regular invoices
- `POST /api/send-pdfs-gastos` - Send emails with PDF attachments for expense invoices

### Important Implementation Details

1. **PDF Generation**: Uses @react-pdf/renderer with custom templates that include company logos, tax information, and invoice details
2. **Email Sending**: Nodemailer configuration uses environment variables for SMTP settings
3. **Data Processing**: Excel files contain property information and are processed using xlsx library
4. **File Naming**: PDFs are named with pattern: `Factura_[PropertyName]_[Month]_[Year].pdf`
5. **Language**: UI is primarily in Spanish, code comments mix English and Spanish

### Testing

No testing framework is currently implemented in this project.

### Common Development Tasks

When working on invoice templates:
- Regular invoices: app/components/InvoiceTemplate.jsx
- Expense invoices: app/components/InvoiceTemplate-Gastos.jsx

When modifying data processing:
- Regular invoices: app/lib/data.tsx
- Expense invoices: app/lib/dataGastos.tsx

When updating API logic:
- Check both regular and gastos versions of endpoints
- Ensure Excel file URLs in .env.local are accessible