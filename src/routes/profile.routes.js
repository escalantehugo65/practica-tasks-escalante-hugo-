import { Router } from "express";
import { body, param } from 'express-validator';
import { validateResult } from "../middlewares/validator.middleware.js";
import { ProfileModel as Profile } from "../models/profile.model.js";
import { UserModel as User } from "../models/user.model.js";

import {
  getProfiles,
  createProfile
} from "../controllers/profile.controller.js";

const router = Router();


const validateId = [
  param("id")
    .isInt({ min: 1 }).withMessage("El ID debe ser un número entero positivo")
    .custom(async (value) => {
      const profile = await Profile.findByPk(value);
      if (!profile) {
        throw new Error("El perfil no existe en la base de datos");
      }
    }),
  validateResult,
];

const validateCreateProfile = [
  body("bio")
    .optional()
    .isLength({ max: 500 }).withMessage("La biografía no debe superar los 500 caracteres"),

  body("phone")
    .optional()
    .isLength({ max: 20 }).withMessage("El teléfono no debe superar los 20 caracteres"),

  body("user_id")
    .notEmpty().withMessage("El id de usuario es obligatorio")
    .isInt({ min: 1 }).withMessage("El id debe ser un entero positivo")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("El usuario asignado no existe en la base de datos");
      }
    }),
  validateResult,
];


router.get("/", getProfiles);
router.post("/", validateCreateProfile, createProfile);

export default router;