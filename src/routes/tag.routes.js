import { Router } from "express";
import { getTags, createTag } from "../controllers/tag.controller.js";

const router = Router();

router.get("/", getTags);
router.post("/", createTag);

export default router;