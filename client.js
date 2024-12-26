// client.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const baseUrl = "http://127.0.0.1:8000/api";
const baseUrl = "http://10.0.2.2:8000/api";


// // with axios instance
// const apiClient = axios.create({
//     baseUrl: 'http://127.0.0.1:8000/api',
// });

export const loginn = async (username, password) => {
    try {
        const response = await axios.post(`${baseUrl}/user/login`, { username, password });
        const generated_token = response.data.access_token; 
        if (generated_token) {
            // await AsyncStorage.setItem('authToken', generated_token);
            await AsyncStorage.setItem('jwtToken', generated_token); // Match key with `checkLogin`

            return true;
        }
        return false;
    } 
    catch (error) {
        console.error("Error verifying credentials:", error);
        throw new Error("Failed to verify credentials");
    }
}

// // with axios instance
// export const loginn = async (username, password) => {
//     try {
//         const response = await apiClient.post('/user/login', { username, password });
//         const generated_token = response.data.token; 
//         return generated_token != null; 
//     } 
//     catch (error) {
//         console.error("Error verifying credentials:", error);
//         throw new Error("Failed to verify credentials");
//     }
// }

export const uploadFiles = async (files) => {
    const formData = new FormData();
  
    // Append all files to the form data
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });
  
    try {
      // Send POST request to the backend API
      const response = await axios.post(`${baseUrl}/user/upload-files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // On success, handle the response
      if (response.data && response.data.message) {
        console.log(response.data.message);  // Display the success message
        return true;
      }
      return false;
    } catch (error) {
      // Handle errors
      console.error("Error uploading files:", error);
      throw new Error("Failed to upload files");
    }
  };



// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const apiClient = axios.create({
//     baseURL: 'http://127.0.0.1:8000/api',
// });

// export const loginn = async (username, password) => {
//     try {
//         const response = await apiClient.post('/user/login', { username, password });
//         const generated_token = response.data.token;
//         if (generated_token) {
//             await AsyncStorage.setItem('jwtToken', generated_token);
//             return true;
//         }
//         return false;
//     } catch (error) {
//         console.error("Error verifying credentials:", error.message || error);
//         throw new Error("Failed to verify credentials");
//     }
// };

// export const uploadFiles = async (files) => {
//     const formData = new FormData();
//     files.forEach((file) => {
//         formData.append('files', file);
//     });

//     try {
//         const response = await apiClient.post('/user/upload-files', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' },
//         });

//         if (response.data && response.data.message) {
//             console.log(response.data.message);
//             return true;
//         }
//         return false;
//     } catch (error) {
//         console.error("Error uploading files:", error.message || error);
//         throw new Error("Failed to upload files");
//     }
// };
