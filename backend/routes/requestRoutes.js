import express from "express";
import { protectRoute } from "../middleware/protectRoute.js"
import { fetchRequestOfUser, createRequest, acceptRequest, fetchRequestByProject } from "../controllers/request.controller.js";


const router = express.Router();

router.get('/', protectRoute, fetchRequestOfUser)
router.post('/create', protectRoute, createRequest)
router.get('/accept-request/:requestId', protectRoute, acceptRequest)
router.get('/request-by-project/:projectId', protectRoute, fetchRequestByProject)
export default router;