// client.js
import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000/api";

// with axios instance
// const apiClient = axios.create({
//     baseUrl: 'http://127.0.0.1:8000',
// });

export const verifyCredentials = async (username, password) => {
    try {
        const response = await axios.post(`${baseUrl}/user/login`, { username, password });
        const generated_token = response.data.token; 
        return generated_token != null; 
    } 
    catch (error) {
        console.error("Error verifying credentials:", error);
        throw new Error("Failed to verify credentials");
    }
}

// with axios instance
// export const verifyCredentials = async (username, password) => {
//     try {
//         const response = await apiClient.post('/client', { username, password });
//         const generated_token = response.data.token; 
//         return generated_token != null; 
//     } 
//     catch (error) {
//         console.error("Error verifying credentials:", error);
//         throw new Error("Failed to verify credentials");
//     }
// }