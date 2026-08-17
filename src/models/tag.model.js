import { DataTypes } from "sequelize";
import baseDatos from "../config/database.js";
import { TaskModel } from "./task.model.js";

const TagModel = baseDatos.define("Tag", {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
});

TagModel.belongsToMany(TaskModel, { through: "TaskTags", foreignKey: "tag_id" });
TaskModel.belongsToMany(TagModel, { through: "TaskTags", foreignKey: "task_id" });

export { TagModel };