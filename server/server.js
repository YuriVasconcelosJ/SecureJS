const express = require("express");
const cors = require("../middleware/corsConfig");
const authRoutes = require("../routes/authRoutes");

const app = express();
const PORT = 3030;

app.use(express.json());
app.use(cors);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
