import express from "express";
import baseDatos from "./src/config/database.js";
import { UserModel } from "./src/models/user.model.js";
import { TaskModel } from "./src/models/task.model.js";

import userRoutes from "./src/routes/user.routes.js";
import taskRoutes from "./src/routes/task.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import tagRoutes from "./src/routes/tag.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/tags", tagRoutes);

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