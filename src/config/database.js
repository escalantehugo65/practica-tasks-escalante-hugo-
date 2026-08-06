import { Sequelize } from "sequelize";

const baseDatos = new Sequelize("task_users_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default baseDatos;
