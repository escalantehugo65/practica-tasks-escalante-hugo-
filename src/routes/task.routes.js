import { Router } from "express";
import {body, param}  from 'express-validator';
import { validateResult } from "../middlewares/validator.middleware.js";
import { UserModel as User} from "../models/user.model.js";
import { TaskModel as Task} from "../models/task.model.js";
import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";

const router = Router();

const validateId = [
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

const validateCreateTask = [
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
const validateUpdateTask = [
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

router.get("/", getTasks);
router.get("/:id",validateId, getTaskById);
router.post("/",validateCreateTask, createTask);
router.put("/:id",validateId, validateUpdateTask, updateTask);
router.delete("/:id",validateId, deleteTask);

export default router;