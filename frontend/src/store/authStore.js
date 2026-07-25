import { create } from "zustand";
import axios from "axios";

const API_URL = 'http://localhost:5000/api/auth';
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    // FUNCTION
    signup: async (username, name, email, password, role) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, {
                username, name, email, password, role
            });
            console.log("RESPONSE >>> ",response)
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false
            })
        } catch (error) {
            set({error: error.response.data.message || "Error signing up", isLoading: false});

            throw error;
        }
    },
    verifyEmail: async (code) => {
        
        set({
            isLoading: true,
            error: null
        });
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code });
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false,
            })

            return response.data;

        } catch (error) {
            set({
                error: error.response.data.message || "Error verifing email",
                isLoading: false
            })

            throw error;
        }
    }


}))

