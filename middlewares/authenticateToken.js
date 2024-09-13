// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.log('Token não fornecido'); // Log para token ausente
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // Extrai o token do formato Bearer
  if (!token) {
    console.log('Formato de token inválido'); // Log para formato incorreto
    return res.status(403).json({ message: 'Formato de token inválido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token inválido:', err.message); // Log do erro de validação
      return res.status(401).json({ message: 'Token inválido' });
    }
    console.log('Token verificado com sucesso, userId:', decoded.userId); // Log de sucesso
    req.userId = decoded.userId;
    next();
  });
};
