// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  console.log('Tentativa de registro:', { email }); // Log para depuração

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('Usuário já existe:', email); // Log do erro de usuário existente
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const newUser = new User({ email, password });
    await newUser.save();
    console.log('Usuário registrado com sucesso:', email); // Log do sucesso no registro
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error); // Log do erro
    res.status(500).json({ message: 'Erro ao registrar usuário', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Tentativa de login:', { email }); // Log para depuração

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Usuário não encontrado:', email); // Log de erro de credenciais
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Senha incorreta para o usuário:', email); // Log de erro de senha
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login bem-sucedido, token gerado para:', email); // Log de sucesso no login
    res.json({
      message: 'Login bem-sucedido',
      token,
      user: { id: user._id, email: user.email }, // Enviando o usuário para o frontend
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error); // Log do erro
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};

exports.validateToken = async (req, res) => {
  try {
    // Obter o token do cabeçalho de autorização
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      console.log('Token não fornecido');
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1]; // Extrai o token do formato "Bearer <token>"
    if (!token) {
      console.log('Token inválido');
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Verifica o token com a chave secreta do JWT
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log('Erro ao decodificar o token:', err.message);
        return res.status(403).json({ message: 'Token inválido ou expirado' });
      }

      console.log('Token decodificado com sucesso:', decoded); // Log do token decodificado

      // Encontre o usuário no banco de dados para validar se ainda está ativo
      const user = await User.findById(decoded.userId);
      if (!user) {
        console.log('Usuário não encontrado com o ID:', decoded.userId);
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Responde com os dados do usuário validado
      console.log('Usuário validado com sucesso:', user.email);
      res.status(200).json({ user: { id: user._id, email: user.email } });
    });
  } catch (error) {
    console.error('Erro ao validar token:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
