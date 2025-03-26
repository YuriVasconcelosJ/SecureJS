const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function conectarBanco() {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
      console.log("Conexão com o MongoDB");
    }

    const db = client.db("bancoDeDadosJavaScript");

    const collections = await db
      .listCollections({ name: "usuarios" })
      .toArray();
    if (collections.length === 0) {
      await db.createCollection("usuarios");
      console.log("📂 Coleção 'usuarios' criada!");
    }

    return db;
  } catch (erro) {
    console.error("Erro ao conectar no MongoDB:", erro);
    throw erro;
  }
}

module.exports = { conectarBanco };
