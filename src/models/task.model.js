import { DataTypes, STRING } from "sequelize";

import baseDatos from "../config/database.js";

const Task = baseDatos.define('task',{
    title:{
        type:DataTypes.STRING(100),
        allowNull:false,
        unique: true,
    },
    description:{
        type:DataTypes.STRING(100),
        allowNull:false,
    },
    isComplete:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    }
});

export{Task};