import express from "express";
import baseDatos from "./src/config/database.js";

const app = express();

const PORT = 3000;

try {
  await baseDatos.authenticate();
  console.log("Base de Datos conectada con exito");
} catch (error) {
  console.log("Hubo un error al conectar la base de datos");
}

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
