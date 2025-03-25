// Declaração de variáveis
const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient } = require("mongodb");
const PORT = 3030;
// Variáveis do mongodb
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function conectarBanco() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB");
  
    const db = client.db("bancoDeDadosJavaScript");
    const usuarios = db.collection("usuarios");
  } catch(erro) {
    console.log(erro);
  }
}

// Opções do Cors
const corsOption = {
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());

app.use(cors(corsOption));

app.get("/", (req, res) => {
  res.send("Aplicação rodando");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Simulando um usuário cadastrado (depois isso vai vir do banco)
  const usuarioFake = {
    email: "teste@email.com",
    password: "123456", // OBS: No futuro, as senhas devem ser criptografadas
  };

  if (email === usuarioFake.email && password === usuarioFake.password) {
    res.status(200).json({ mensagem: "Login realizado com sucesso!" });
  } else {
    res.status(401).json({ mensagem: "E-mail ou senha inválidos!" });
  }
});

app.post("/register", async (req, res) =>{
  try {
    const { registerEmail, registerPassword} = req.body;
    const db = client.db("bancoDeDadosJavaScript");
    const usuarios = db.collection("usuarios");

    const usuarioExistente = await usuarios.findOne({registerEmail});

    if (usuarioExistente) {
      return res.status(400).json({mensagem: "Usuário já cadastrado"});
    }

    await usuarios.insertOne({ email, password });
    res.status(201).json({ mensagem: "Usuário registrado com sucesso!" });
  } catch(erro) {
    console.log(erro);
    res.status(500).json({mensagem: "Erro no servidor"})
  }
})

app.listen(PORT, () => {
  console.log("Servidor rodando");
});
