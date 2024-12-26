// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { CameraView, useCameraPermissions, useMicrophonePermissions, Camera } from 'expo-camera';

// const VideoStreaming = () => {
//     const cameratypes =  {
//         front : 'front'
//     }
    
//     const cameraRef = useRef(null);
//     const [facing, setFacing] = useState(cameratypes.front);
//     const [cameraPermission, requestPermission] = useCameraPermissions();
//     const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
//     const [isRecording, setIsRecording] = useState(false);
//     const [recordedVideoUri, setRecordedVideoUri] = useState(null);

    

//     useEffect(() => {
                
//         (async () => {
//             if (!cameraPermission) {
//                 await requestCameraPermission();
//             }
//             if (!microphonePermission) {
//                 await requestMicrophonePermission();
//             }
//         })();
//     }, [cameraPermission, microphonePermission]);
        
//     if (!cameraPermission || !cameraPermission.granted || !microphonePermission || !microphonePermission.granted) {
//         return <Text>Camera and microphone permissions are required to use this feature.</Text>;
//     }

//     const toggleCameraFacing = () => {
//         setFacing(facing === cameraTypes.back ? cameraTypes.front : cameraTypes.back);
//     };
   
//     const startRecording = async () => {
//         if (cameraRef.current) {
//             try {
//                 setIsRecording(true); // Set recording state to true
//                 const video = await cameraRef.current.recordAsync({
//                     maxDuration: 60,
//                     mute: true,
//                 });
//                 setRecordedVideoUri(video.uri); // Save the recorded video URI
//                 setIsRecording(false); // Set recording state back to false after recording ends
//                 Alert.alert('Recording Complete', 'Video has been recorded successfully.');
//             } catch (error) {
//                 console.error('Error recording video:', error);
//                 setIsRecording(false); // Ensure recording state is reset if an error occurs
//             }
//         }
//     };
    
//     const stopRecording = () => {
//         if (cameraRef.current) {
//             cameraRef.current.stopRecording();
//             setIsRecording(false); // Set recording state back to false
//         }
//     };
    
//     // Camera Video Recording Screen
//     return (
//         <View style={styles.container}>
//             <CameraView
//                 ref={cameraRef}
//                 style={styles.camera}
//                 type={cameratypes.back}
//             >
//                 <View style={styles.buttonContainer}>
//                     {!isRecording ? (
//                         <TouchableOpacity
//                             style={styles.recordButton}
//                             onPress={startRecording}
//                         >
//                             <View style={styles.recordButtonInner} />
//                         </TouchableOpacity>
//                     ) : (
//                         <TouchableOpacity
//                             style={styles.stopButton}
//                             onPress={stopRecording}
//                         >
//                             <View style={styles.stopButtonInner} />
//                         </TouchableOpacity>
//                     )}
//                 </View>
//             </CameraView>
//             {isRecording && (
//                 <View style={styles.recordingIndicator}>
//                     <Text style={styles.recordingText}>Recording...</Text>
//                 </View>
//             )}
//         </View>
//     );
    
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
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
//   flipButton: {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     padding: 15,
//     borderRadius: 10,
//     marginRight: 20,
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
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   previewContainer: {
//     flex: 1,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   previewMessage: {
//     color: 'white',
//     fontSize: 20,
//     marginBottom: 20,
//   },
//   previewButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     paddingHorizontal: 20,
//   },
//   actionButton: {
//     padding: 15,
//     borderRadius: 10,
//     width: '40%',
//     alignItems: 'center',
//   },
//   retakeButton: {
//     backgroundColor: '#FF6347',
//   },
//   playButton: {
//     backgroundColor: '#4CAF50',
//   },
//   actionButtonText: {
//     color: 'white',
//     fontSize: 18,
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
//   message: {
//     color: 'white',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   permissionButton: {
//     backgroundColor: '#2196F3',
//     padding: 15,
//     borderRadius: 10,
//   },
// });

// export default VideoStreaming;



import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { Buffer } from 'buffer';

const VideoStreaming = () => {
  const cameratypes = {
    front: 'front',
    back: 'back',
  };

  const cameraRef = useRef(null);
  const [facing, setFacing] = useState(cameratypes.front);
  const [cameraPermission, requestPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
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
        
        // When frame received message is received, show the indicator
        if (event.data.includes('Frame received')) {
          setFrameReceived(true);
          
          // Hide the indicator after 2 seconds
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
      if (websocket.readyState === WebSocket.OPEN || websocket.readyState === WebSocket.CONNECTING) {
        websocket.close();
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (!cameraPermission) {
        await requestPermission();
      }
      if (!microphonePermission) {
        await requestMicrophonePermission();
      }
    })();
  }, [cameraPermission, microphonePermission]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onFrameReceived = (frame) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const buffer = Buffer.from(frame.data, 'base64'); // Convert frame data to a byte array
      ws.send(buffer);
    //   ws.send();
    //   ws.send("hey") // Send the byte array over the WebSocket
    }
  };

  if (!cameraPermission || !cameraPermission.granted || !microphonePermission || !microphonePermission.granted) {
    return <Text>Camera and microphone permissions are required to use this feature.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.connectionStatus}>{connectionStatus}</Text>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        type={facing}
        onFrame={(frame) => isRecording && onFrameReceived(frame)} // Send frames only when recording
      >
        <View style={styles.buttonContainer}>
          {!isRecording ? (
            <TouchableOpacity
              style={styles.recordButton}
              onPress={startRecording}
            >
              <View style={styles.recordButtonInner} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.stopButton}
              onPress={stopRecording}
            >
              <View style={styles.stopButtonInner} />
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
      {isRecording && (
        <View style={styles.recordingIndicator}>
          <Text style={styles.recordingText}>Recording...</Text>
        </View>
      )}
      {/* Frame Received Indicator */}
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
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'red',
  },
  recordButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  stopButton: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopButtonInner: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
  },
  recordingIndicator: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  recordingText: {
    color: 'white',
    fontWeight: 'bold',
  },
  frameReceivedIndicator: {
    position: 'absolute',
    top: 60,
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


