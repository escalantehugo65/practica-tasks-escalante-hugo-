import express from "express";
import baseDatos from "./src/config/database.js";
import { User } from "./src/models/user.model.js";
import { Task } from "./src/models/task.model.js";

const app = express();

const PORT = 3000;

try {
  await baseDatos.authenticate();
  console.log("Base de Datos conectada con exito");

  await baseDatos.sync({ alter: true }); 
  console.log("Tablas creadas/actualizadas con éxito");
  
} catch (error) {
  console.log("Hubo un error al conectar la base de datos", error);
}

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
