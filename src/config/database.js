import "dotenv/config";
import { Sequelize } from "sequelize";

console.log("DB:", process.env.DB_NAME);
console.log("USER:", process.env.DB_USER);
console.log("HOST:", process.env.DB_HOST);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

export default sequelize;
