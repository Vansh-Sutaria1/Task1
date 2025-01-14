# Documentation

## Introduction
This React Native application provides a structured solution for user authentication and navigation between different functionalities, such as viewing graphs, uploading files, using the camera, and logging out. It utilizes a drawer navigator for better user experience and integrates authentication checks.

## Technologies Used
- React Native  
- Expo  
- @react-navigation/native  
- expo-camera  
- expo-media-library  

## Features
- **Login Authentication:** Users can log in with a username and password.
- **Drawer Navigation:** Navigate seamlessly between different screens like Home, Graphs, Upload Files, and Camera.
- **Logout Functionality:** Users can securely log out.
- **Camera Integration:** Capture photos/videos using the device camera.
- **Graph Viewer:** Navigate to the graph viewing screen.

## Prerequisites
Before running the project, ensure you have the following installed:
- Node.js (v16 or higher)
- Expo CLI

## Components Overview
### App.jsx
- Sets up the main navigation for the app, including:
  - **Drawer Navigator:** Includes Home, Graphs, Upload Files, and Camera screens.
  - **Stack Navigator:** Handles transitions between login and main app screens.
- Checks user login state during initialization using `SessionManagement.js`.

### SessionManagement.js
- Provides utility functions `checkLogin` and `logout` to manage user sessions.

## Screens Description
### LoginScreen.jsx
- Allows users to enter credentials and log in.
- Validates credentials using the `loginn` function from `client.js`.
- Displays an activity indicator during login.

### HomeScreen.jsx
- Main screen after login.
- Provides buttons to:
  - Navigate to Graphs.
  - Open Settings (placeholder alert).
  - Log out.

### GraphScreen.jsx
- Displays graphs (implementation pending or placeholder).
- Accessed via the drawer navigation.

### UploadFileScreen.jsx
- Handles file uploads (implementation pending or placeholder).
- Accessed via the drawer navigation.

### CameraScreen.jsx
- Integrates with `expo-camera` for capturing photos/videos.
- Accessed via the drawer navigation.

## Navigation Flow
### Stack Navigator
- **Login:** First screen if the user is not logged in.
- **Main:** Container for the Drawer Navigator.

### Drawer Navigator (Main)
- **Home:** Default screen after login.
- **Graphs:** Displays the graphs screen.
- **Upload Files:** Opens the file upload screen.
- **Camera:** Opens the camera screen.
- **Video_Streaming** Live streaming of video.
