const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const PORT = 3030;

// Variáveis do MongoDB
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

// Função de conexão com o banco
async function conectarBanco() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB");

    const db = client.db("bancoDeDadosJavaScript");
    const usuarios = db.collection("usuarios");
    return usuarios; // Retorna a coleção de usuários
  } catch (erro) {
    console.log("Erro ao conectar ao banco:", erro); // Log adicional
    throw new Error("Erro ao conectar ao banco de dados");
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

// Rota de teste
app.get("/", (req, res) => {
  res.send("Aplicação rodando");
});

// Rota de login
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

app.post("/register", async (req, res) => {
  try {
    const { registerEmail, registerPassword } = req.body;
    const usuarios = await conectarBanco();

    // Verificando se o usuário já existe
    const usuarioExistente = await usuarios.findOne({ email: registerEmail });

    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "Usuário já cadastrado" });
    }

    // Criptografando a senha antes de salvar
    const salt = await bcrypt.genSalt(10); // Gera um salt
    const hashedPassword = await bcrypt.hash(registerPassword, salt); // Criptografa a senha com salt

    // Log antes de tentar inserir no banco
    console.log("Inserindo usuário:", registerEmail, hashedPassword);

    // Inserindo o novo usuário no banco de dados com a senha criptografada
    await usuarios.insertOne({
      email: registerEmail,
      password: hashedPassword, // Senha criptografada
    });

    res.status(200).json({ mensagem: "Usuário registrado com sucesso!" });
  } catch (erro) {
    // O erro está aqui
    console.log("Erro ao registrar usuário:", erro); // Log detalhado do erro
    res.status(500).json({ mensagem: "Erro no servidor" });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
