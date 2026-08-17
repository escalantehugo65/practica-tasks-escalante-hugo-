import { DataTypes } from "sequelize";
import baseDatos from "../config/database.js";
import { UserModel } from "./user.model.js";

const ProfileModel = baseDatos.define("Profile", {
  bio: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
});

ProfileModel.belongsTo(UserModel, { foreignKey: "user_id" });
UserModel.hasOne(ProfileModel, { foreignKey: "user_id" });

export { ProfileModel };