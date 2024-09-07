import { getExcelData } from '../lib/data';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await getExcelData();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Excel data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
