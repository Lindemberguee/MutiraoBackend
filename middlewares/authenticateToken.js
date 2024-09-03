const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);  // Log do cabeçalho de autorização

  if (!authHeader) return res.status(401).send('Acesso negado. Nenhum token fornecido.');

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Acesso negado. Token inválido.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Erro na verificação do JWT:', error.message);
    res.status(401).send('Acesso negado. Token inválido ou expirado.');
  }
};

module.exports = authenticateToken;
