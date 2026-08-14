import User from "../models/user.model.js";
import Request from "../models/request.model.js";
import Project from "../models/project.model.js";

import { sendEmail } from "../email/sendEmail.js";

export const fetchRequestOfUser = async (req, res) => {
    
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        const requests = await Request.find({ owner: user._id }).populate({
            path: "project",
            select: "title description"
        }).populate({
            path: "company",
            select: "username email"
        });

        return res.status(200).json({
            success: true,
            message: "List requests of user connected",
            requests
        })
    } catch (error) {
        
    }
}

export const createRequest = async (req, res) => {
    try {
        const { title, description, owner, project, completionTime, company} = req.body;
        const user = await User.findById(req.user._id).select("-password");
        
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const projectRequest = await Project.findById(project);
        if (!projectRequest) {
            return res.status(400).json({
                success: false,
                message: "Project not found"
            })
        }

        const request = new Request({
            title,
            description,
            owner: user,
            project,
            completionTime,
            company
        })

        await request.save();
        
        projectRequest.request = request._id;
        
        await projectRequest.save();
        

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            request
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
      
}

export const acceptRequest = async (req, res) => {
    try {
        const {requestId} = req.params
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(500).json({
                success: false,
                message: "Request not found"
            })    
        }
        const company = await User.findById(req.user._id);
        if (!company) {
            return res.status(500).json({
                success: false,
                message: "Company not found"
            })
        }
        const project = await Project.findById(request.project).populate({
            path: "owner",
            select: "username email"
        });
        // console.log(project.owner.username);
        
        if (!project) {
            return res.status(500).json({
                success: false,
                message: "Project not found"
            })
        }

        request.status = "accepted";
        request.company = company._id;
        request.startDate = new Date()
        request.statusInfo = 10;

        project.status = "inprogressed";

        await request.save();
        await project.save();

        sendEmail("1formartic@gmail.com", "acceptRequest", "", project.owner.username, "");
        

        return res.status(200).json({
            success: true,
             message: "Request accepted",
            request
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const fetchRequestDedicatedToCompany = async (req, res) => {
    try {
        console.log("COMPANY CONNECTED >>> ", req.user);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const fetchRequestByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const requests = await Request.find({ project: projectId });
        res.status(200).json({
            success: true,
            message: "Requests by projects",
            requests
        })      
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}