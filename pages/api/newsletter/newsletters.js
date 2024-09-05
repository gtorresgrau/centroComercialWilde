import { connectDB } from '../../../server/utils/mongodb';
import Newsletter from '../../../src/models/newsletter';
import rateLimiter from '../../../server/utils/rateLimiter';

const handleGet = async (req, res) => {
  try {
    const emails = await Newsletter.find();
    res.status(200).json({ emails });
  } catch (error) {
    console.error('Error al obtener los emails del Newsletter:', error);
    res.status(500).json({ message: 'Error al obtener los emails del Newsletter' });
  }
};

const handlePost = async (req, res) => {
  try {
    const { newsletter } = req.body;

    // Validar el correo electrónico
    if (!newsletter || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newsletter)) {
      return res.status(400).json({ message: 'Correo electrónico no válido' });
    }

    // Verificar si el correo electrónico ya está registrado
    const existingEmail = await Newsletter.findOne({ email: newsletter });
    if (existingEmail) {
      return res.status(409).json({ message: 'Este correo electrónico ya está registrado.' });
    }

    const newMail = new Newsletter({ email: newsletter });
    await newMail.save();
    res.status(200).json({ message: 'Email registrado con éxito' });
  } catch (error) {
    console.error('Error al agregar un email al newsletter:', error);
    res.status(500).json({ error: 'Error al agregar un email al newsletter' });
  }
};

const handlePut = async (req, res) => {
  try {
    const { id, email } = req.body;
    const updatedMail = await Newsletter.findByIdAndUpdate(id, { email }, { new: true, runValidators: true });
    if (!updatedMail) {
      return res.status(404).json({ message: 'Email no encontrado' });
    }
    res.status(200).json({ message: 'Email actualizado con éxito', updatedMail });
  } catch (error) {
    console.error('Error al actualizar el email del newsletter:', error);
    res.status(500).json({ error: 'Error al actualizar el email del newsletter' });
  }
};


export default async function handler(req, res) {
  if (!rateLimiter(req, res)) return;

  await connectDB();

  switch (req.method) {
    case 'GET':
      await handleGet(req, res);
      break;
    case 'POST':
      await handlePost(req, res);
      break;
    case 'PUT':
      await handlePut(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
