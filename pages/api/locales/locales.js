import { connectDB } from "../../../server/utils/mongodb";
import Local from "../../../src/models/locales";

// Controlador para el método GET
async function handleGet(req, res) {
  try {
    const locales = await Local.find();
    return res.status(200).json({ locales });
  } catch (error) {
    console.error("Error al obtener los locales:", error);
    return res.status(500).json({ message: "Error al obtener los locales" });
  }
}

export default async function handler(req, res) {
  await connectDB();
  return handleGet(req, res);
}
