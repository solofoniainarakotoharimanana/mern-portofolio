import User from "../models/user.model.js"
import Project from "../models/project.model.js"

import {uploadImageOnCloudinary} from "../config/cloudinary.js"

export const createProject = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const fileDescription = req.file?.filename;
        const fileDescriptionPath = req.file?.path
        

        const owner = await User.findById(req.user._id);
        
        if (!owner) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        //UPLOADING IMAGE ON CLOUDINARY
        const {secure_url, public_id} = await uploadImageOnCloudinary(fileDescriptionPath, "projects")
        if (!secure_url) {
            return res.status(400).json({
                success: false,
                message: "Error when uploading image",
                error: secure_url
            })
        }

        const newProject = new Project({
            title,
            description,
            category,
            fileDescription: secure_url,
            owner:{
                ...owner._doc,
                password: undefined
            },  
        })

        await newProject.save();
        
        res.status(201).json({
            success: true,
            message: "Project created successfully",
            newProject
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}
export const fetchProjectsOfUsers = async (req, res) => {
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 10;
    // const skip = (page - 1) * limit;

    try {
        // const projects = await Project.find().skip(skip).limit(limit).populate('category');
        // const total = await Project.countDocuments();
        const projects = await Project.find({ owner: req.user._id }).sort({createdAt: -1}).populate('category');
        
        res.json({
            projects,
            // pagetotalPages: Math.ceil(total / limit),
            // currentPage: 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const fetchProjectById = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId).populate({
            path: "owner",
            select: "name username email"
        }).populate({
            path: "category",
            select: "name"
        });

        if (!project) {
            return res.status(400).json({
                success: false,
                message: "Project not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Fetching project successfully",
            project
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const fetchProjectsByStatus = async(req, res) => {
    try {
        const userId = req.user._id;
        const {status} = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const projects = await Project.find({
            $and: [
                {owner: user._id},
                {status: status}
            ]
        })

        return res.status(200).json({
            success: true,
            message: "Project list",
            projects
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


