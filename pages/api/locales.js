import { NextResponse } from 'next/server';
import { connectDB } from '../../src/lib/mongodb';
import Local from '../../src/models/locales';

export default async function handler(req, res) {
  await connectDB();

  try {
    const locales = await Local.find();
    console.log(locales,'locales')
    NextResponse.json({ locales });
  } catch (error) {
    console.error('Error al obtener los locales:', error);
    res.status(500).json({ error: 'Error al obtener los locales' });
  }
}
