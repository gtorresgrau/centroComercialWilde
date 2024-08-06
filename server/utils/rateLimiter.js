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

export default rateLimiter;
