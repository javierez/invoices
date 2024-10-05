import { getExcelDataGastos } from '../../lib/dataGastos';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export async function POST(request) {
  console.log('API route hit: POST /api/send-pdfs-gastos');
  try {
    const { pdfs } = await request.json();
    
    if (!pdfs || !Array.isArray(pdfs)) {
      throw new Error('PDFs data is missing or invalid');
    }

    const excelData = await getExcelDataGastos();

    // Configure nodemailer with your email service
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send emails
    for (let i = 0; i < pdfs.length; i++) {
      const pdf = pdfs[i];
      const rowData = excelData[i];

      await transporter.sendMail({
        from: `"Beatriz García" <${process.env.EMAIL_USER}>`,
        // to: rowData.mail,
        to: 'javierez1998@gmail.com',
        subject: `Factura Mes ${new Date().toLocaleString('es-ES', { month: 'long' })} (con gastos)`,
        text: `Buenos días,

Adjunto factura del mes de ${new Date().toLocaleString('es-ES', { month: 'long' })} incluyendo gastos adicionales.

Muchas gracias,
Beatriz`,
        attachments: [
          {
            filename: pdf.fileName,
            content: Buffer.from(pdf.data, 'base64')
          }
        ]
      });
    }

    return NextResponse.json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
