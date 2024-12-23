import { getExcelData } from '../../lib/data';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
//import dotenv from 'dotenv';

//dotenv.config({ path: '.env.local' });

export async function POST(request) {
  console.log('API route hit: POST /api/send-pdfs');
  try {
    const { pdfs, page } = await request.json();
    console.log('Received page:', page);
    
    // Get the referer from the request headers
    const referer = request.headers.get('referer');
    const activePage = referer.includes('info-manager-Beatriz') ? 'info-manager-Beatriz' : 
                       referer.includes('info-manager-Compartidas') ? 'info-manager-Compartidas' : 'unknown';
    console.log('Route activated from:', activePage);
    
    if (!page) {
      throw new Error('Page information is missing');
    }

    const excelData = await getExcelData(page);

    // Configure nodemailer with your email service
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    });

    // Verify SMTP connection
    await transporter.verify();
    console.log('SMTP connection verified');

    // Log the email configuration (without sensitive data)
    console.log('Email configuration:', {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      user: process.env.EMAIL_USER,
      passProvided: !!process.env.EMAIL_PASS
    });

    // Send emails
    for (let i = 0; i < pdfs.length; i++) {
      const pdf = pdfs[i];
      const rowData = excelData[i];

      await transporter.sendMail({
        from: `"Beatriz García" <${process.env.EMAIL_USER}>`,
        to: rowData.mail,
        //to: 'javierez1998@gmail.com',
        subject: `Factura Mes ${new Date().toLocaleString('es-ES', { month: 'long' })}`,
        text: `Buenos días,

Adjunto facturas del mes de ${new Date().toLocaleString('es-ES', { month: 'long' })}.

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
