import axios from 'axios';

const API_URL = "http://localhost:8080/api";

// Create a User (Register)
export const registerUser = async (user) => {
    try {
        // We send: { username, password, role }
        const response = await axios.post(`${API_URL}/users/register`, user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Login User (We will use this next)
export const loginUser = async (user) => {
    // For now, we just verify the user exists (since we haven't added JWT yet)
    // We will implement this logic in the backend shortly
    return axios.post(`${API_URL}/users/login`, user);
};

export const addLand = async (landData) => {
    return axios.post(`${API_URL}/lands`, landData);
};

// Fetch All Lands (For the dashboard list later)
export const getAllLands = async () => {
    return axios.get(`${API_URL}/lands`);
};
// Approve Land
export const approveLand = async (id) => {
    return axios.put(`${API_URL}/lands/${id}/approve`);
};

// Delete Land
export const deleteLand = async (id) => {
    return axios.delete(`${API_URL}/lands/${id}`);
};

// Reject Land
export const rejectLand = async (id) => {
    return axios.put(`${API_URL}/lands/${id}/reject`);
};