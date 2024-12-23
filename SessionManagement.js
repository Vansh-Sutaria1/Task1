// // SessionManagement.js
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import jwt from 'jsonwebtoken';
// import jwt_decode from 'jwt-decode';

// const SECRET_KEY = 'dummySecretKey';

// export const verifyCredentials = async (username, password) => {
//   const validUsername = 'user';
//   const validPassword = 'password';

//   if (username === validUsername && password === validPassword) {
//     const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

//     try {
//       await AsyncStorage.setItem('jwtToken', token); 
//       return true; 
//     } catch (error) {
//       console.error('Error storing token:', error);
//       return false; 
//     }
//   }

//   return false; 
// };

// export const checkLogin = async () => {
//   try {
//     const token = await AsyncStorage.getItem('jwtToken');
//     if (!token) return false; 

//     const decodedToken = jwt_decode(token);

//     if (decodedToken.exp < Date.now() / 1000) {
//       await AsyncStorage.removeItem('jwtToken');
//       return false;
//     }

//     return true; 
//   } catch (error) {
//     console.error('Error validating token:', error);
//     return false;
//   }
// };

// export const logout = async () => {
//   try {
//     await AsyncStorage.removeItem('jwtToken'); 
//     return true; 
//   } catch (error) {
//     console.error('Error during logout:', error);
//     return false;
//   }
// };


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CryptoJS from 'crypto-js';

// const SECRET_KEY = 'dummySecretKey'; // Secret key for signing tokens

// /**
//  * Generate a simple JWT token.
//  * @param {Object} payload - The payload to encode.
//  * @returns {string} - The JWT token.
//  */
// const generateToken = (payload) => {
//   const header = { alg: 'HS256', typ: 'JWT' };
//   const base64Header = Buffer.from(JSON.stringify(header)).toString('base64');
//   const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
//   const signature = CryptoJS.HmacSHA256(`${base64Header}.${base64Payload}`, SECRET_KEY)
//     .toString(CryptoJS.enc.Base64);

//   return `${base64Header}.${base64Payload}.${signature}`;
// };

// /**
//  * Decode a JWT token without verifying.
//  * @param {string} token - The JWT token to decode.
//  * @returns {Object} - The decoded payload.
//  */
// const decodeToken = (token) => {
//   const [header, payload] = token.split('.');
//   return JSON.parse(Buffer.from(payload, 'base64').toString());
// };

// export const verifyCredentials = async (username, password) => {
//   const validUsername = 'user';
//   const validPassword = 'password';

//   if (username === validUsername && password === validPassword) {
//     const payload = {
//       username,
//       exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1 hour
//     };

//     const token = generateToken(payload);

//     try {
//       await AsyncStorage.setItem('jwtToken', token); 
//       return true; 
//     } catch (error) {
//       console.error('Error storing token:', error);
//       return false; 
//     }
//   }

//   return false; 
// };

// export const checkLogin = async () => {
//   try {
//     const token = await AsyncStorage.getItem('jwtToken');
//     if (!token) return false; 

//     const decodedToken = decodeToken(token);

//     if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
//       await AsyncStorage.removeItem('jwtToken');
//       return false;
//     }

//     return true; 
//   } catch (error) {
//     console.error('Error validating token:', error);
//     return false;
//   }
// };

// export const logout = async () => {
//   try {
//     await AsyncStorage.removeItem('jwtToken'); 
//     return true; 
//   } catch (error) {
//     console.error('Error during logout:', error);
//     return false;
//   }
// };


// move token management to backend
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CryptoJS from 'crypto-js';
// import { encode, decode } from 'base-64';

// const SECRET_KEY = 'dummySecretKey'; // Secret key for signing tokens

// // Generate a simple JWT token
// const generateToken = (payload) => {
//   const header = { alg: 'HS256', typ: 'JWT' };
//   const base64Header = encode(JSON.stringify(header));
//   const base64Payload = encode(JSON.stringify(payload));
//   const signature = CryptoJS.HmacSHA256(`${base64Header}.${base64Payload}`, SECRET_KEY)
//     .toString(CryptoJS.enc.Base64);

//   return `${base64Header}.${base64Payload}.${signature}`;
// };

// // Verify credentials in the backend
// export const verifyCredentials = async (username, password) => {
//   const validUsername = 'user';
//   const validPassword = 'password';

//   if (username === validUsername && password === validPassword) {
//     const payload = {
//       username,
//       // exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1 hour
//       exp: Math.floor(Date.now() / 1000) + 60, // Token expires in 1 minute
//     };

//     const token = generateToken(payload);

//     try {
//       await AsyncStorage.setItem('jwtToken', token); 
//       return true;
//     } catch (error) {
//       console.error('Error storing token:', error);
//       return false;
//     }
//   }

//   return false;
// };

// SessionManagement.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Decode a JWT token without verifying
const decodeToken = (token) => {
  const [header, payload] = token.split('.');
  return JSON.parse(decode(payload)); // Decode the payload with base-64
};

// Check login status token storage in the frontend
export const checkLogin = async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    if (!token) return false;

    const decodedToken = decodeToken(token);

    if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
      await AsyncStorage.removeItem('jwtToken');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

// Logout
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('jwtToken');
    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    return false;
  }
};

// client.js will handle all api calls 