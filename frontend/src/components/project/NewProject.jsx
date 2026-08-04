import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { AlertCircle, FileText, Loader, Upload, User, User2 } from 'lucide-react';

import { useCategoryStore } from "../../store/categoryStore.js";
import { useProjectsStore } from "../../store/projectStore.js";

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const NewProject = () => {
    const { categories, fetchCategories } = useCategoryStore();
    const { createProject, isLoading } = useProjectsStore()
    const [categoriesList, setCategoriesList] = useState([]);
    const navigate = useNavigate();
    const [category, setCategory] = useState("Volvo");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: ""
    });

    useEffect(() => {
        // console.log("oooo")
        fetchCategories();
        setCategoriesList(categories);
    }, [])

    const [formState, setFormState] = useState({
        loading: false,
        success: false,
        // showPassword: false,
        errors: {},
        fileDescription: null
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
        // console.log("FORM  DATA >>> ", formData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createProject(formData.title, formData.description, formData.category);
        toast.success("Project created successfully");
        navigate('/login');
        setFormData({
            ...formData,
            [name]: ""
        })
    }

    // console.log("CATEGORIES 222 >>> ", formData);

    return (
        <div>
            <div className='mb-8'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className=''>

                    <h3
                        className='text-center 
                        text-4xl font-semibold
                        bg-linear-to-r from-amber-400 to-amber-700 text-shadow-md  bg-clip-text  text-transparent'>Create a new project</h3>
                    <form noValidate
                        onSubmit={handleSubmit}
                        className='space-y-6'>
                        <div className='my-6'>
                            <label className='block text-sm font-medium text-slate-50 mb-2'>Title *</label>
                            <div className='relative'>
                                {/* <User2 className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' /> */}
                                <input
                                    type='text'
                                    name='title'
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className={`w-full pl-5 pr-12 py-3 rounded-lg border bg-slate-50
                                    ${formState.errors.title ? "border-red-500" : "border-gray-300"} 
                                    focus:ring-blue-500 focus:border-transparent transition-colors`}
                                    placeholder='Enter your title'
                                />
                                {formState.errors.title && (
                                    <p className='text-red-500 mt-1 text-sm flex items-center'>
                                        <AlertCircle className='w-4 h-4 mr-2' />
                                        {formState.errors.title}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='my-6'>
                            <div className="mb-2">
                                <label
                                    htmlFor="project-description"
                                    className="block text-slate-50 font-semibold text-md">Description</label>
                            </div>
                            <div className="relative">
                                <textarea type="text"
                                    rows='5'
                                    cols="5"
                                    id="project-description"
                                    className="w-full pl-6 pr-12 py-3 outline-none bg-gray-50 rounded-lg border"
                                    placeholder="Description"
                                    name="description"
                                    value={formData.decsription}
                                    onChange={handleInputChange}
                                ></textarea>
                                {formState.errors.description && (
                                    <p className='text-red-500 mt-1 text-sm flex items-center'>
                                        <AlertCircle className='w-4 h-4 mr-2' />
                                        {formState.errors.description}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="my-6">
                            <div className="mb-2">
                                <label
                                    htmlFor="project-title"
                                    className="block text-slate-50 font-semibold text-md">Category</label>
                            </div>
                            <div className="relative">
                                <select name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className='w-full pl-6 pr-12 py-3
                                    outline-none bg-gray-50 rounded-lg border'>
                                    <option >Select category</option>
                                    {categoriesList && categoriesList.map((category) => {
                                        return <option value={category._id} key={category._id}>{category.name}</option>
                                    })}
                                </select>
                                {formState.errors.category && (
                                    <p className='text-red-500 mt-1 text-sm flex items-center'>
                                        <AlertCircle className='w-4 h-4 mr-2' />
                                        {formState.errors.category}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='my-6'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Attachment file (Optional)
                            </label>
                            <div className='flex items-center space-x-4'>
                                <div className='w-16 h-16 rounded-full flex items-center justify-center overflow-hidden '>
                                    {
                                        formState.fileDescription ?
                                            (<img
                                                src={formState.fileDescription}
                                                alt='Avatar Preview'
                                                className='w-full h-full object-cover'
                                            />) : (
                                                <FileText className='w-10 h-10 border-2 rounded-full p-2 bg-gray-100 text-gray-500' />
                                            )
                                    }
                                </div>
                                <div className='flex-1'>
                                    <input
                                        type='file'
                                        id='avatar'
                                        accept='.jpg,.png,.jepg, .pdf'
                                        // onChange={handleChangeAvatar}
                                        className='hidden'
                                    />
                                    <label
                                        htmlFor='avatar'
                                        className='cursor-pointer bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-4'
                                    >
                                        <Upload className='w-4 h-4' />
                                        <span>Upload Photo</span>
                                        <p className='text-xs text-gray-500 mt-1'>JPG, PNG, PDF up to 5Mb</p>
                                    </label>
                                </div>
                            </div>
                            {/* {formState.errors.avatar && (
                    <p className='text-red-500 mt-1 text-sm flex items-center ' >
                    <AlertCircle className='w-4 h-4 mr-1' />
                    {formState.errors.password}
                    </p>
                    )} */}
                        </div>
                        <div>
                            <button
                                type='submit'
                                className='w-full bg-blue-600 
                                text-white font-semibold cursor-pointer hover:bg-blue-700 hover:text-white/95
                                rounded-md py-2'>

                                {isLoading ? <Loader className='w-6 h-6 text-center animate-spin mx-auto' /> : 'Create new project'}
                            </button>
                        </div>
                    </form>

                </motion.div>
            </div>
        </div>
    )
}

export default NewProject
