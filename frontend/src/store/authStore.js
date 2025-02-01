import { create } from "zustand";
import axios from "axios";

// Add axios default baseURL
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true; // Important for cookies

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async(email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password,
            });

            // Check if we have user data in the response
            if (response.data && response.data.user) {
                set({
                    user: response.data.user,
                    isAuthenticated: true,
                    isLoading: false,
                });
                return true;
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            console.error("Login error:", error);
            set({
                error: error.response && error.response.data ?
                    error.response.data.message :
                    "Login failed. Please check your credentials.",
                isLoading: false,
            });
            return false;
        }
    },

    signup: async(userData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post("/api/auth/signup", userData);
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false,
            });
            return true;
        } catch (error) {
            set({
                error: error.response && error.response.data ?
                    error.response.data.message :
                    "Signup failed",
                isLoading: false,
            });
            return false;
        }
    },

    logout: async() => {
        try {
            await axios.post("/api/auth/logout");
        } finally {
            set({
                user: null,
                isAuthenticated: false,
                error: null,
            });
        }
    },

    clearError: () => set({ error: null }),
}));

export default useAuthStore;