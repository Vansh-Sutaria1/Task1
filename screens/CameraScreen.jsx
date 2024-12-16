// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

// const CameraScreen = ({ navigation }) => {
//   const [facing, setFacing] = useState('back');
//   const [permission, requestPermission] = useCameraPermissions();

//   if (!permission) {
//     // Camera permissions are still loading.
//     return <View style={styles.container} />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet.
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>We need your permission to show the camera</Text>
//         <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
//           <Text style={styles.buttonText}>Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const toggleCameraFacing = () => {
//     setFacing(current => (current === 'back' ? 'front' : 'back'));
//   };

//   return (
//     <View style={styles.container}>
//       <CameraView 
//         style={styles.camera} 
//         facing={facing}
//         mode="video"
//       >
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//             <Text style={styles.buttonText}>Flip Camera</Text>
//           </TouchableOpacity>
//         </View>
//       </CameraView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'black',
//   },
//   message: {
//     textAlign: 'center',
//     paddingBottom: 10,
//     color: 'white',
//     fontSize: 18,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     margin: 64,
//   },
//   button: {
//     flex: 1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     padding: 10,
//     borderRadius: 10,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: 'white',
//   },
//   permissionButton: {
//     alignSelf: 'center',
//     backgroundColor: '#2196F3',
//     padding: 10,
//     borderRadius: 10,
//   },
// });

// export default CameraScreen;


import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
// import * as MediaLibrary from 'expo-media-library';

const CameraScreen = ({ navigation }) => {
  
  const [facing, setFacing] = useState('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
//   const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  const cameraRef = useRef(null);

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  // Picture Capture
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedImage(photo.uri);
      } catch (error) {
        console.error("Picture capture failed:", error);
      }
    }
  };

//   // Save Picture
//   const savePicture = async () => {
//     if (!mediaLibraryPermission?.granted) {
//       const result = await requestMediaLibraryPermission();
//       if (!result.granted) {
//         Alert.alert('Permission Required', 'Please grant media library access to save the photo');
//         return;
//       }
//     }

//     try {
//       const asset = await MediaLibrary.createAssetAsync(capturedImage);
//       await MediaLibrary.createAlbumAsync('ExpoCamera', asset, false);
      
//       // Optional: Navigate to next screen or perform action with saved image
//       navigation.navigate('NextScreen', { image: capturedImage });
//     } catch (error) {
//       console.error("Picture save failed:", error);
//     }
//   };

  // Retake Picture Method
  const retakePicture = () => {
    setCapturedImage(null);
  };

  // Permission Handling
  if (!cameraPermission) {
    return <View style={styles.container} />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Camera permission is required</Text>
        <TouchableOpacity onPress={requestCameraPermission} style={styles.permissionButton}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render Preview Screen if Picture is Captured
  if (capturedImage) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: capturedImage }} style={styles.previewImage} />
        <View style={styles.previewButtonContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.retakeButton]} 
            onPress={retakePicture}
          >
            <Text style={styles.actionButtonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.saveButton]} 
            // onPress={savePicture}
          >
            <Text style={styles.actionButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Camera Capture Screen
  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        mode="picture"
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.flipButton} 
            onPress={toggleCameraFacing}
          >
            <Text style={styles.buttonText}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.captureButton} 
            onPress={takePicture}
          >
            <Text style={styles.buttonText}>Capture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  flipButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 10,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  previewButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionButton: {
    padding: 15,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  retakeButton: {
    backgroundColor: '#FF6347',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
  },
  message: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    alignSelf: 'center',
    borderRadius: 10,
  },
});

export default CameraScreen;