import express from "express";
import {
  getProjects,
  getFeaturedProjects,
  createProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/featured", getFeaturedProjects);
router.post("/", createProject);

export default router;
