import { create } from "zustand";
import axios from "axios";

const API_URL = 'http://localhost:5000/api/requests';
axios.defaults.withCredentials = true;
export const useRequestStore = create(
    (set) => ({
        requests: null,
        fetchRequestOfUser: async () => {
            const results = await axios.get(`${API_URL}/`)
            set({ requests: results.data.requests })
            
            // console.log("REQUESTS OF USER >>> ", results)
            return results;
        },
        createRequest: async (title, description, owner, project, completionTime, company) => {
            const result = await axios.post(`${API_URL}/create`, {
                title,
                description,
                owner,
                project,
                completionTime,
                company
            })
        },
        fetchRequestByProject: async (projectId) => {
            const results = await axios.get(`${API_URL}/request-by-project/${projectId}`);
            return results.data.requests;
        }
    })
);

