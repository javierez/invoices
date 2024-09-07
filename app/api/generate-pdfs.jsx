import { renderToStream } from '@react-pdf/renderer';
import InvoiceTemplate from '../components/InvoiceTemplate';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { data } = req.body;
    
    const pdfs = await Promise.all(data.map(async (row) => {
      const stream = await renderToStream(<InvoiceTemplate data={row} />);
      return stream.toBuffer();
    }));

    res.status(200).json({ pdfs: pdfs.map(pdf => pdf.toString('base64')) });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
