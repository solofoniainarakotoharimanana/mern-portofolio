import express from "express";
import { protectRoute } from "../middleware/protectRoute.js"
import {
    fetchRequestOfUser,
    createRequest,
    acceptRequest,
    fetchRequestByProject,
    fetchRequestOfCompany,
    likeAndDislikeRequest,
    interessedAndUninteressedRequest,
    acceptedRequest
} from "../controllers/request.controller.js";


const router = express.Router();

router.get('/', protectRoute, fetchRequestOfUser)
router.post('/create', protectRoute, createRequest)
router.get('/accept-request/:requestId', protectRoute, acceptRequest)
router.get('/accepted-request', protectRoute, acceptedRequest)
router.get('/request-by-project/:projectId', protectRoute, fetchRequestByProject)
router.get('/request-of-company', protectRoute, fetchRequestOfCompany)
router.get('/like-dislike/:requestId', protectRoute, likeAndDislikeRequest)
router.get('/interessed/:requestId', protectRoute, interessedAndUninteressedRequest)

export default router;