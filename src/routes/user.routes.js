import { Router } from "express";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const router = Router();

import { validateCreateUser, validateId, validateUpdateUser } from "../middlewares/validation/user.validation.js";

router.get("/", getUsers);
router.get("/:id", validateId, getUserById);
router.post("/", validateCreateUser, createUser);
router.put("/:id", validateId, validateUpdateUser, updateUser);
router.delete("/:id", validateId, deleteUser);

export default router;
