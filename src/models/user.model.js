import { DataTypes } from "sequelize";
import baseDatos from "../config/database.js";

const UserModel = baseDatos.define("User", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
},{
  timestamps: true,
  paranoid: true
});

export { UserModel };
