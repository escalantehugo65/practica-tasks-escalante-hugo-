import { body, param } from 'express-validator';
import { validateResult } from "./validator.middleware.js";
import { UserModel as User } from "../models/user.model.js";

export const validateId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("El usuario no existe en la base de datos");
      }
    }),
  validateResult,
];

export const validateCreateUser = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede superar los 100 caracteres"),

  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ingresar un email válido")
    .custom(async (value) => {
      const existingUser = await User.findOne({ where: { email: value } });
      if (existingUser) {
        throw new Error("El email ya está registrado");
      }
    }),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  validateResult,
];
export const validateUpdateUser = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede superar los 100 caracteres"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Debe ingresar un email válido")
    .custom(async (value, { req }) => {
      const existingUser = await User.findOne({ where: { email: value } });
      if (existingUser && existingUser.id !== Number(req.params.id)) {
        throw new Error("El email ya está registrado por otro usuario");
      }
    }),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  validateResult,
];
