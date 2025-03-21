// Declaração de variáveis
const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 3030;

const corsOption = {
    origin: "",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]

};

app.use(cors());

app.get("/", (req, res) => {
    res.send("Aplicação rodando")
})

app.listen(PORT, () => {
    console.log("Servidor rodando");
});