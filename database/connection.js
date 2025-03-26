const { MongoClient } = require("mongodb");

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

module.exports = { conectarBanco };
