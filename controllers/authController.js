const bcrypt = require("bcrypt");
const {conectarBanco} = require("../database/connection.js");
const {isUserBlocked} = require("../public/script.js")
const {registerFailedAttempt} = require("../public/script.js")


async function login(req, res) {
  const { email, password } = req.body;

  try {
    const usuarios = await conectarBanco();
    
    const usuario = await usuarios.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensagem: "Usuário não encontrado!" });
    }

    const senhaCorreta = await bcrypt.compare(password, usuario.password);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Senha incorreta!" });
    }

    res.status(200).json({ mensagem: "Login realizado com sucesso!" });

  } catch (erro) {
    console.error("Erro no login:", erro);
    res.status(500).json({ mensagem: "Erro no servidor" });
  }
}

async function register(req, res) {
  const { email, password } = req.body;
  
  try {
    const usuarios = await conectarBanco();
    
    const usuarioExistente = await usuarios.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado!" });
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    await usuarios.insertOne({ email, password: hashedPassword });
    
    res.status(201).json({ mensagem: "Usuário registrado com sucesso!" });

  } catch (erro) {
    console.error("Erro no registro:", erro);
    res.status(500).json({ mensagem: "Erro ao registrar usuário" });
  }
}

module.exports = { login, register };