import { Router } from "express";


import { getTags, createTag } from "../controllers/tag.controller.js";

const router = Router();

import { validateCreateTag } from "../middlewares/validation/tag.validation.js";

router.get("/", getTags);
router.post("/", validateCreateTag, createTag);

export default router;
