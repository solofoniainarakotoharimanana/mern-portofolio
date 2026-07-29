import { create } from "zustand";

import axios from "axios";

const API_URL = 'http://localhost:5000/api/projects';
axios.defaults.withCredentials = true;

export const useProjectsStore = create(
    (set) => ({
        projects: null, 
        totalPages: 1,
        fetchProjectsOfUser: async (page, limit) => {
            const response = await axios.get(`${API_URL}/?page=${page}&limit=${limit}`);
            console.log("PROJECTS RESPONSE >>> ", response)
            set({projects: response.data.projects, totalPages: response.data.totalPages})
        }
    })
)