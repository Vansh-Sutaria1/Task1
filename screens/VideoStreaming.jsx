// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
// import { Buffer } from 'buffer';

// const VideoStreaming = () => {
//   const cameratypes = {
//     front: 'front',
//     back: 'back',
//   };

//   const cameraRef = useRef(null);
//   const [facing, setFacing] = useState(cameratypes.front);
//   const [cameraPermission, requestPermission] = useCameraPermissions();
//   const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
//   const [isRecording, setIsRecording] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState('Connecting...');
//   const [ws, setWs] = useState(null);
//   const [frameReceived, setFrameReceived] = useState(false);

//   useEffect(() => {
//     // Establish WebSocket connection
//     const websocket = new WebSocket('ws://10.0.2.2:8000/api/ws/video');
    
//     websocket.onopen = () => {
//       console.log('WebSocket connection opened');
//       setConnectionStatus('Connected');
//     };

//     websocket.onmessage = (event) => {
//         console.log('WebSocket message received:', event.data);
        
//         // When frame received message is received, show the indicator
//         if (event.data.includes('Frame received')) {
//           setFrameReceived(true);
          
//           // Hide the indicator after 2 seconds
//           setTimeout(() => {
//             setFrameReceived(false);
//           }, 2000);
//         }
//       };

//     websocket.onerror = (error) => {
//       console.error('WebSocket error:', error);
//       setConnectionStatus('Connection Error');
//     };

//     websocket.onclose = () => {
//       console.log('WebSocket connection closed');
//       setConnectionStatus('Disconnected');
//     };

//     setWs(websocket);

//     return () => {
//       if (websocket.readyState === WebSocket.OPEN || websocket.readyState === WebSocket.CONNECTING) {
//         websocket.close();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     (async () => {
//       if (!cameraPermission) {
//         await requestPermission();
//       }
//       if (!microphonePermission) {
//         await requestMicrophonePermission();
//       }
//     })();
//   }, [cameraPermission, microphonePermission]);

//   useEffect(() => {
//     console.log(isRecording)
//   },[isRecording]);

//   const startRecording = () => {
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     setIsRecording(false);
//   };

//   const onFrameReceived = (frame) => {
//     console.log("Debugging websocket issues ",ws)
//     console.log("Debugging websocket issues ",ws.readyState)
//     if (ws && ws.readyState === WebSocket.OPEN) {
//       const buffer = Buffer.from(frame.data, 'base64'); // Convert frame data to a byte array
//       console.log("Debugging websocket issues",buffer)
//       ws.send(buffer);
//     //   ws.send();
//     //   ws.send("hey") // Send the byte array over the WebSocket
//     }
//   };

//   if (!cameraPermission || !cameraPermission.granted || !microphonePermission || !microphonePermission.granted) {
//     return <Text>Camera and microphone permissions are required to use this feature.</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.connectionStatus}>{  connectionStatus}</Text>
//       <CameraView
//         ref={cameraRef}
//         style={styles.camera}
//         type={facing}
//         onFrame={(frame) => onFrameReceived(frame)} // Send frames only when recording
//       >
//         <View style={styles.buttonContainer}>
//           {!isRecording ? (
//             <TouchableOpacity
//               style={styles.recordButton}
//               onPress={startRecording}
//             >
//               <View style={styles.recordButtonInner} />
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity
//               style={styles.stopButton}
//               onPress={stopRecording}
//             >
//               <View style={styles.stopButtonInner} />
//             </TouchableOpacity>
//           )}
//         </View>
//       </CameraView>
//       {isRecording && (
//         <View style={styles.recordingIndicator}>
//           <Text style={styles.recordingText}>Recording...</Text>
//         </View>
//       )}
//       {/* Frame Received Indicator */}
//       {frameReceived && (
//         <View style={styles.frameReceivedIndicator}>
//           <Text style={styles.frameReceivedText}>Frame Received</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   connectionStatus: {
//     textAlign: 'center',
//     padding: 10,
//     backgroundColor: '#e0e0e0',
//     color: '#333',
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   recordButton: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 4,
//     borderColor: 'red',
//   },
//   recordButtonInner: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: 'red',
//   },
//   stopButton: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     backgroundColor: 'red',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   stopButtonInner: {
//     width: 40,
//     height: 40,
//     backgroundColor: 'white',
//   },
//   recordingIndicator: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//   },
//   recordingText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   frameReceivedIndicator: {
//     position: 'absolute',
//     top: 60,
//     right: 20,
//     backgroundColor: 'green',
//     padding: 10,
//     borderRadius: 5,
//   },
//   frameReceivedText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default VideoStreaming;

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { Buffer } from 'buffer';

const VideoStreaming = () => {
  const devices = useCameraDevices();
  const frontCamera = devices.front;
  const backCamera = devices.back;
  const [cameraPosition, setCameraPosition] = useState('front');
  const [camera, setCamera] = useState(frontCamera);
  const [isRecording, setIsRecording] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const [ws, setWs] = useState(null);
  const [frameReceived, setFrameReceived] = useState(false);

  useEffect(() => {
    // Establish WebSocket connection
    const websocket = new WebSocket('ws://10.0.2.2:8000/api/ws/video');

    websocket.onopen = () => {
      console.log('WebSocket connection opened');
      setConnectionStatus('Connected');
    };

    websocket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);

      if (event.data.includes('Frame received')) {
        setFrameReceived(true);
        setTimeout(() => {
          setFrameReceived(false);
        }, 2000);
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Connection Error');
    };

    websocket.onclose = () => {
      console.log('WebSocket connection closed');
      setConnectionStatus('Disconnected');
    };

    setWs(websocket);

    return () => {
      if (
        websocket.readyState === WebSocket.OPEN ||
        websocket.readyState === WebSocket.CONNECTING
      ) {
        websocket.close();
      }
    };
  }, []);

  const requestPermissions = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    const microphonePermission = await Camera.getMicrophonePermissionStatus();

    if (cameraPermission !== 'authorized') {
      await Camera.requestCameraPermission();
    }
    if (microphonePermission !== 'authorized') {
      await Camera.requestMicrophonePermission();
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    if (isRecording && ws && ws.readyState === WebSocket.OPEN) {
      console.log('Debugging WebSocket issues:', ws);
      console.log('WebSocket readyState:', ws.readyState);

      const buffer = Buffer.from(frame, 'base64'); // Convert frame data to a byte array
      ws.send(buffer); // Send frame data through WebSocket
    }
  }, [isRecording, ws]);

  if (!frontCamera || !backCamera) {
    return <Text>Loading cameras...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.connectionStatus}>{connectionStatus}</Text>
      {camera && (
        <Camera
          style={styles.camera}
          device={camera}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={30} // Adjust frame rate as needed
        />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.switchCameraButton}
          onPress={() => {
            const newPosition = cameraPosition === 'front' ? 'back' : 'front';
            setCamera(newPosition === 'front' ? frontCamera : backCamera);
            setCameraPosition(newPosition);
          }}
        >
          <Text style={styles.switchCameraText}>
            Switch to {cameraPosition === 'front' ? 'Back' : 'Front'} Camera
          </Text>
        </TouchableOpacity>
        {!isRecording ? (
          <TouchableOpacity
            style={styles.recordButton}
            onPress={() => setIsRecording(true)}
          >
            <Text style={styles.recordText}>Start Recording</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.stopButton}
            onPress={() => setIsRecording(false)}
          >
            <Text style={styles.stopText}>Stop Recording</Text>
          </TouchableOpacity>
        )}
      </View>
      {frameReceived && (
        <View style={styles.frameReceivedIndicator}>
          <Text style={styles.frameReceivedText}>Frame Received</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  connectionStatus: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#e0e0e0',
    color: '#333',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchCameraButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
  },
  switchCameraText: {
    color: '#fff',
  },
  recordButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  recordText: {
    color: 'white',
  },
  stopButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
  },
  stopText: {
    color: 'white',
  },
  frameReceivedIndicator: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  frameReceivedText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default VideoStreaming;
