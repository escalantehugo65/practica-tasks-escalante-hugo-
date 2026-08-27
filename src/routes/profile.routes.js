import { Router } from "express";

import {
  getProfiles,
  createProfile
} from "../controllers/profile.controller.js";

const router = Router();

import { validateCreateProfile } from "../middlewares/validation/profile.validation.js";


router.get("/", getProfiles);
router.post("/", validateCreateProfile, createProfile);

export default router;