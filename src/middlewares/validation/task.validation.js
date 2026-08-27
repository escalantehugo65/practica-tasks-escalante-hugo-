import { body, param } from 'express-validator';
import { validateResult } from "./validator.middleware.js";
import { TaskModel as Task} from '../../models/task.model.js';
import { UserModel as User } from "../models/user.model.js";


export const validateId = [
  param("id")
    .isInt({ min: 1 }).withMessage("El ID debe ser un número entero positivo")
    .custom(async (value) => {
      const task = await Task.findByPk(value);
      if (!task) {
        throw new Error("La tarea no existe en la base de datos");
      }
    }),
  validateResult,
];

export const validateCreateTask = [
  body("title")
    .notEmpty().withMessage("El titulo es obligatorio")
    .isLength({ max: 100 }).withMessage("El titulo no puede superar los 100 caracteres"),

  body("description")
    .notEmpty().withMessage("La descripción es obligatoria")
    .isLength({max: 500 }).withMessage("La descripción no debe de superar los 500 caracteres"),

  body("isComplete")
    .optional()
    .isBoolean().withMessage("Este campo debe ser completado como un valor booleano(Verdadero o falso)"),

    body("user_id")
        .notEmpty().withMessage("El id de usuario es oblgatorio")
        .isInt({min: 1}).withMessage("El id debe ser un entero positivo")
        .custom(async (value, { req }) => {
        const user = await User.findByPk(value)
        if(!user){
            throw new Error("El usuario asignado no existe en la base de datos")
        }
    }),


  validateResult,
];
export const validateUpdateTask = [
 body("title")
    .optional()
    .notEmpty().withMessage("El titulo es obligatorio")
    .isLength({ max: 100 }).withMessage("El titulo no puede superar los 100 caracteres"),

  body("description")
    .optional()
    .notEmpty().withMessage("La descripción es obligatoria")
    .isLength({max: 500 }).withMessage("La descripción no debe de superar los 500 caracteres"),

  body("isComplete")
    .optional()
    .isBoolean().withMessage("Este campo debe ser completado como un valor booleano(Verdadero o falso)"),

body("user_id")
    .optional()
    .notEmpty().withMessage("El id de usuario es oblgatorio")
    .isInt({min: 1}).withMessage("El id debe ser un entero positivo")
    .custom(async (value, { req }) => {
    const user = await User.findByPk(value)
    if(!user){
        throw new Error("El usuario asignado no existe en la base de datos")
    }
    }),


  validateResult,
];