// pages/api/download-csv.js
import { connectDB } from '../../src/lib/mongodb';
import Locales from '../../src/models/locales';
import { parse } from 'json2csv';

export default async function handler(req, res) {
  try {
    await connectDB();

    const local = await Locales.find().lean();

    if (!local || local.length === 0) {
      return res.status(404).json({ error: 'No local found' });
    }

    const fields = [
      email,
      contacto,
      celular,
      linea,
      ubicacion,
      categoria,
      rubro,
      rubroSecundario,
      horarios,
      logoLocal,
      fotoLocal,
      instagram,
      facebook,
      texto
    ];

    const opts = { fields };
    const csv = parse(products, opts);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=products.csv');
    res.status(200).send(csv);
  } catch (error) {
    console.error('Error downloading CSV:', error);
    return res.status(500).json({ error: 'Error downloading CSV' });
  }
}
