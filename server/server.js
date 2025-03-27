const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const PORT = 3030;

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function conectarBanco() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB");
    const db = client.db("bancoDeDadosJavaScript");
    return db.collection("usuarios");
  } catch (erro) {
    console.log("Erro ao conectar ao banco:", erro);
    throw new Error("Erro ao conectar ao banco de dados");
  }
}

const loginAttempts = {}; // Armazena tentativas de login por IP
const LOCK_TIME = 5 * 60 * 1000; // 5 minutos de bloqueio
const MAX_ATTEMPTS = 3;

const corsOption = {
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOption));

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuarios = await conectarBanco();
    
    // Buscar usuário pelo e-mail
    const usuario = await usuarios.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ mensagem: "Usuário não encontrado!" });
    }

    // Comparar a senha informada com a senha armazenada (hash)
    const senhaCorreta = await bcrypt.compare(password, usuario.password);
    if (!senhaCorreta) {
      console.log(`Usuário:${usuario._id}`);
      console.log(`Senha correta:${senhaCorreta}`);
      console.log(`Senha inserida:${usuario.password}`);
      return res.status(401).json({ mensagem: usuario._id, senhaCorreta });
    }

    res.status(200).json({ mensagem: "Login realizado com sucesso!" });

  } catch (erro) {
    console.error("Erro no login:", erro);
    res.status(500).json({ mensagem: "Erro no servidor" });
  }
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const usuarios = await conectarBanco();
    
    // Verificar se o usuário já existe
    const usuarioExistente = await usuarios.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado!" });
    }
    
    // Criptografar a senha antes de salvar
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Inserir usuário no banco
    await usuarios.insertOne({ email, password: hashedPassword });
    
    res.status(201).json({ mensagem: "Usuário registrado com sucesso!" });
    
  } catch (erro) {
    console.error("Erro no registro:", erro);
    res.status(500).json({ mensagem: "Erro ao registrar usuário" });
  }
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});