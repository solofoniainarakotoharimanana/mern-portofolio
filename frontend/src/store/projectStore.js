import { create } from "zustand";

import axios from "axios";

const API_URL = 'http://localhost:5000/api/projects';
axios.defaults.withCredentials = true;

export const useProjectsStore = create(
    (set) => ({
        project: null,
        projects: null, 
        // totalPages: 1,
        isLoading: false,
        fetchProjectsOfUser: async () => {
            // const response = await axios.get(`${API_URL}/?page=${page}&limit=${limit}`);
            const response = await axios.get(`${API_URL}/`);
            console.log("PROJECTS RESPONSE >>> ", response)
            set({projects: response.data.projects})
        },
        fetchProjectById: async (projectId) => {
            const response = await axios.get(`${API_URL}/${projectId}`);
            set({ project: response.data.project });

            return response.data.project;
        },
        createProject: async (title, description, category) => {
            set({isLoading: true})
            const response = await axios.post(`${API_URL}/create`, { title, description, category })
            set({isLoading: false})

            return response;
        }
    })
)