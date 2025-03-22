// Declaração de variáveis
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3030;

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

app.listen(PORT, () => {
  console.log("Servidor rodando");
});
