import { connectDB } from '../../lib/mongodb';
import Newsletter from '../../../src/models/newsletter';

// Almacenamiento en memoria para rastrear las solicitudes por IP
const rateLimitMap = new Map();
const WINDOW_SIZE_IN_MINUTES = 1; // Ventana de tiempo en minutos
const MAX_REQUESTS = 5; // Máximo número de solicitudes permitidas por IP en la ventana de tiempo

const rateLimiter = (req, res) => {
  const currentTime = Date.now();
  const windowStartTimestamp = currentTime - WINDOW_SIZE_IN_MINUTES * 60 * 1000;

  const userRequests = rateLimitMap.get(req.ip) || [];
  const filteredRequests = userRequests.filter(timestamp => timestamp > windowStartTimestamp);

  rateLimitMap.set(req.ip, [...filteredRequests, currentTime]);

  if (filteredRequests.length >= MAX_REQUESTS) {
    res.status(429).json({ message: 'Demasiadas solicitudes, por favor intente nuevamente en unos minutos.' });
    return false;
  }

  return true;
};

export default async function handler(req, res) {
  if (!rateLimiter(req, res)) return; // Aplica el limitador

  await connectDB(); // Conectar a la base de datos
  
  if (req.method === 'GET') {
    try {
      const emails = await Newsletter.find(); // Obtener todos los emails de la base de datos newsletter
      res.status(200).json({ emails }); // Enviar los emails como respuesta
    } catch (error) {
      console.error('Error al obtener los emails del Newsletter:', error);
      res.status(500).json({ message: 'Error al obtener los emails del Newsletter' });
    }
  } else {
    // Manejo de métodos no permitidos
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
