// import 'react-native-get-random-values'; // Ensure this is included
// import 'react-native-randombytes'; // For random bytes generation
// import 'react-native-crypto'; // For crypto
// import 'react-native-buffer'; // For Buffer support
// import 'util'; // For util functions like inherits
// import 'inherits'; // For inherits functionality


// App.jsx
import * as React from 'react';
import {useState, useEffect} from 'react';
import { View, ActivityIndicator } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";

import LoginScreen from './screens/LoginScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import GraphScreen from './screens/GraphScreen.jsx';
import UploadFileScreen from './screens/UploadFileScreen.jsx'
import CameraScreen from './screens/CameraScreen.jsx';
import WSChat from './screens/WSChat.jsx';
import { checkLogin } from './SessionManagement.js';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Graphs" component={GraphScreen} />
    <Drawer.Screen name="Upload Files" component={UploadFileScreen} />
    <Drawer.Screen name="Camera" component={CameraScreen} />
    <Drawer.Screen name="Chat" component={WSChat} />
  </Drawer.Navigator>
);


const MyStack = () => { 
  const [loading, setLoading] = useState(true); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLogin = async () => {
      const isLoggedIn = await checkLogin();
      setIsLoggedIn(isLoggedIn);
      setLoading(false);
    };

    checkUserLogin();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Main" : "Login"}>
        {/* <Stack.Screen name="Login" component={LoginScreen} />  */}
       
        <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
          
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = {
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default MyStack;

// import React, { useState, useEffect } from "react";

// import { View, ActivityIndicator, StyleSheet, Alert } from "react-native"; 
// Activity indicator is used to show loading spinners

// import { NavigationContainer } from "@react-navigation/native"; 
// The top-level navigation container for managing app navigation.

// import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
// Creates a stack navigator, enabling transitions between screens.

// import AsyncStorage from "@react-native-async-storage/async-storage"; 
// Provides simple local storage to persist the access token securely.

// import LoginScreen from "./screens/LoginScreen";
// import HomeScreen from "./screens/HomeScreen";
// import ProfileScreen from "./screens/ProfileScreen";
// import SettingsScreen from "./screens/SettingsScreen";

// const Stack = createNativeStackNavigator();

// const App = () => {

//   const [isAuthenticated, setIsAuthenticated] = useState(false);
// isAuthenticated: A state variable to track if the user is logged in. Defaults to false.

//   const [loading, setLoading] = useState(true);
// loading: A state variable to show a spinner while checking authentication status.

//   // Check if user is already logged in
//   useEffect(() => {
//     const checkAuthentication = async () => {
//       const token = await AsyncStorage.getItem("accessToken");
//       Retrieves the stored accessToken from AsyncStorage.

//       if (token) {
//         const isValid = await validateToken(token);
//         Calls validateToken to verify the token with the server.

//         setIsAuthenticated(isValid);
//         Updates isAuthenticated based on token validity.
//       }
//       setLoading(false);
//       Stops the spinner after validation is complete.

//     };

//     checkAuthentication();
//   }, []);


//   const validateToken = async (token) => {
//     try {
//       const response = await fetch("https://example.com/validate-token", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.ok;
//     } catch (error) {
//       console.error("Token validation failed:", error);
//       return false;
//     }
//   };

// The API call to validate the token should not be made to AsyncStorage itself. 
// Instead, the token is retrieved from AsyncStorage, and that token is then sent to an external API endpoint to validate it.
// Here’s the distinction:
// AsyncStorage is a local storage solution for React Native. It stores simple key-value pairs on the user's device. 
// In this case, you are using AsyncStorage to store the access token after successful login.
// The API call to validate the token is made to an external server that checks if the token is valid. 
// This involves sending the stored token in the Authorization header to an endpoint on the server that verifies its validity.
// Steps:
// 1) User logs in – The token is saved in AsyncStorage (locally).
// 2) When token validation is needed (e.g., when the app starts or the user performs an action):
//    The token is retrieved from AsyncStorage.
//    A network request (API call) is made to a server with the token in the Authorization header to validate it.
// 3) The server validates the token and responds with whether it is valid or not.

// Why Not Validate the Token Using AsyncStorage?
// AsyncStorage is not designed to perform token validation; it is just a storage solution.
// Validation requires a server-side check, where the server verifies the token against its data.


//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }
// Shows a spinner while the app checks for authentication.

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {!isAuthenticated ? (
//           <Stack.Screen
//             name="Login"
//             component={LoginScreen}
//             options={{ headerShown: false }}
//           />
//         ) : (
//           <>
//             <Stack.Screen name="Home" component={HomeScreen} />
//             <Stack.Screen name="Profile" component={ProfileScreen} />
//             <Stack.Screen name="Settings" component={SettingsScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default App;
