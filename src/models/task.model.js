import { DataTypes, STRING } from "sequelize";

import baseDatos from "../config/database.js";

import { UserModel } from "./user.model.js";

const TaskModel = baseDatos.define(
  "Task",
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTERGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "Id",
      },
    },
  },
  {},
);

TaskModel.belongTo(UserModel, { foreignKey: "user_id", as: "author" });

UserModel.hasmany(TaskModel, { foreignKey: "user_id", as: "tareas" });

export { TaskModel };
