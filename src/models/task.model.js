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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {},
);

TaskModel.belongsTo(UserModel, { foreignKey: "user_id", as: "author" });

UserModel.hasMany(TaskModel, { foreignKey: "user_id", as: "tareas" });

export { TaskModel };
