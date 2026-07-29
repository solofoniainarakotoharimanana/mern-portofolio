import User from "../models/user.model.js"
import Project from "../models/project.model.js"
export const createProject = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        console.log(req.user)
        const owner = await User.findById(req.user._id);
        
        if (!owner) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const newProject = new Project({
            title,
            description,
            category,
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const projects = await Project.find().skip(skip).limit(limit);
        const total = await Project.countDocuments();
        
        res.json({
            projects,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}