import express from "express"
import { createProject, fetchProjectsOfUsers, fetchProjectById, fetchProjectsByStatus } from "../controllers/project.controller.js";
import { protectRoute } from "../middleware/protectRoute.js"

import upload from "../middleware/multer.js";

const router = express.Router();

router.post('/create', protectRoute, upload.single('fileDescription'),createProject)
router.get('/', protectRoute, fetchProjectsOfUsers); 
router.get('/:projectId', protectRoute, fetchProjectById);
router.get('/status/:status', protectRoute, fetchProjectsByStatus);


export default router;