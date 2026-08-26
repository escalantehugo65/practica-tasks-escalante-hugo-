import { Router } from "express";
import { body, param } from 'express-validator';
import { validateResult } from "../middlewares/validator.middleware.js";
import { TagModel as Tag } from "../models/tag.model.js";

import {
  getTags,
  createTag
} from "../controllers/tag.controller.js";

const router = Router();


const validateId = [
  param("id")
    .isInt({ min: 1 }).withMessage("El ID debe ser un número entero positivo")
    .custom(async (value) => {
      const tag = await Tag.findByPk(value);
      if (!tag) {
        throw new Error("La etiqueta no existe en la base de datos");
      }
    }),
  validateResult,
];


const validateCreateTag = [
  body("name")
    .notEmpty().withMessage("El nombre de la etiqueta es obligatorio")
    .isLength({ max: 50 }).withMessage("El nombre no puede superar los 50 caracteres"),
  validateResult,
];

router.get("/", getTags);
router.post("/", validateCreateTag, createTag);

export default router;