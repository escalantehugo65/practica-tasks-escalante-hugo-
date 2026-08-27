import { Router } from "express";
import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";

const router = Router();

import { validateCreateTask,validateId,validateUpdateTask } from "../middlewares/validation/task.validation.js";

router.get("/", getTasks);
router.get("/:id",validateId, getTaskById);
router.post("/",validateCreateTask, createTask);
router.put("/:id",validateId, validateUpdateTask, updateTask);
router.delete("/:id",validateId, deleteTask);

export default router;