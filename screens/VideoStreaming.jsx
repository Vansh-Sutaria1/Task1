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

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
// import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
// import { Buffer } from 'buffer';

// const VideoStreaming = () => {
//   const devices = useCameraDevices();
//   const frontCamera = devices.front;
//   const backCamera = devices.back;
//   const [cameraPosition, setCameraPosition] = useState('front');
//   const [camera, setCamera] = useState(frontCamera);
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
//       console.log('WebSocket message received:', event.data);

//       if (event.data.includes('Frame received')) {
//         setFrameReceived(true);
//         setTimeout(() => {
//           setFrameReceived(false);
//         }, 2000);
//       }
//     };

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
//       if (
//         websocket.readyState === WebSocket.OPEN ||
//         websocket.readyState === WebSocket.CONNECTING
//       ) {
//         websocket.close();
//       }
//     };
//   }, []);

//   const requestPermissions = async () => {
//     const cameraPermission = await Camera.getCameraPermissionStatus();
//     const microphonePermission = await Camera.getMicrophonePermissionStatus();

//     if (cameraPermission !== 'authorized') {
//       await Camera.requestCameraPermission();
//     }
//     if (microphonePermission !== 'authorized') {
//       await Camera.requestMicrophonePermission();
//     }
//   };

//   useEffect(() => {
//     requestPermissions();
//   }, []);

//   const frameProcessor = useFrameProcessor((frame) => {
//     if (isRecording && ws && ws.readyState === WebSocket.OPEN) {
//       console.log('Debugging WebSocket issues:', ws);
//       console.log('WebSocket readyState:', ws.readyState);

//       const buffer = Buffer.from(frame, 'base64'); // Convert frame data to a byte array
//       ws.send(buffer); // Send frame data through WebSocket
//     }
//   }, [isRecording, ws]);

//   if (!frontCamera || !backCamera) {
//     return <Text>Loading cameras...</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.connectionStatus}>{connectionStatus}</Text>
//       {camera && (
//         <Camera
//           style={styles.camera}
//           device={camera}
//           isActive={true}
//           frameProcessor={frameProcessor}
//           frameProcessorFps={30} // Adjust frame rate as needed
//         />
//       )}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={styles.switchCameraButton}
//           onPress={() => {
//             const newPosition = cameraPosition === 'front' ? 'back' : 'front';
//             setCamera(newPosition === 'front' ? frontCamera : backCamera);
//             setCameraPosition(newPosition);
//           }}
//         >
//           <Text style={styles.switchCameraText}>
//             Switch to {cameraPosition === 'front' ? 'Back' : 'Front'} Camera
//           </Text>
//         </TouchableOpacity>
//         {!isRecording ? (
//           <TouchableOpacity
//             style={styles.recordButton}
//             onPress={() => setIsRecording(true)}
//           >
//             <Text style={styles.recordText}>Start Recording</Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity
//             style={styles.stopButton}
//             onPress={() => setIsRecording(false)}
//           >
//             <Text style={styles.stopText}>Stop Recording</Text>
//           </TouchableOpacity>
//         )}
//       </View>
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
//     bottom: 20,
//     left: 20,
//     right: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   switchCameraButton: {
//     backgroundColor: '#333',
//     padding: 10,
//     borderRadius: 5,
//   },
//   switchCameraText: {
//     color: '#fff',
//   },
//   recordButton: {
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//   },
//   recordText: {
//     color: 'white',
//   },
//   stopButton: {
//     backgroundColor: '#333',
//     padding: 10,
//     borderRadius: 5,
//   },
//   stopText: {
//     color: 'white',
//   },
//   frameReceivedIndicator: {
//     position: 'absolute',
//     top: 20,
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



// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { Camera } from 'expo-camera';
// import { Buffer } from 'buffer';
// import RNFS from 'react-native-fs';
// import { FFmpegKit } from 'ffmpeg-kit-react-native';

// const VideoStreaming = () => {
//   const cameraRef = useRef(null);
//   const [cameraPermission, requestPermission] = Camera.useCameraPermissions();
//   const [microphonePermission, requestMicrophonePermission] = Camera.useMicrophonePermissions();
//   const [isRecording, setIsRecording] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState('Connecting...');
//   const [ws, setWs] = useState(null);

//   useEffect(() => {
//     // Establish WebSocket connection
//     const websocket = new WebSocket('ws://10.0.2.2:8000/api/ws/video');

//     websocket.onopen = () => {
//       console.log('WebSocket connection opened');
//       setConnectionStatus('Connected');
//     };

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

//   const startRecording = async () => {
//     if (cameraRef.current) {
//       setIsRecording(true);
//       const videoPath = `${RNFS.DocumentDirectoryPath}/video.mp4`;

//       await cameraRef.current.recordAsync({
//         quality: '1080p',
//         maxDuration: 10, // Record for 10 seconds
//       }).then(async (video) => {
//         console.log('Video saved to:', video.uri);

//         // Extract frames from the video using FFmpeg
//         const outputDir = `${RNFS.DocumentDirectoryPath}/frames`;
//         await RNFS.mkdir(outputDir);

//         const ffmpegCommand = `-i ${video.uri} -vf fps=1 ${outputDir}/frame%03d.jpg`; // Extract 1 frame per second
//         FFmpegKit.execute(ffmpegCommand).then(async (session) => {
//           const state = await session.getState();
//           if (state === 'COMPLETED') {
//             console.log('Frames extracted successfully');
//             // Transmit frames over WebSocket
//             await sendFrames(outputDir);
//           } else {
//             console.error('FFmpeg execution failed');
//           }
//         });
//       }).catch((err) => console.error('Error during recording:', err));
//     }
//   };

//   const stopRecording = () => {
//     if (cameraRef.current && isRecording) {
//       cameraRef.current.stopRecording();
//       setIsRecording(false);
//     }
//   };

//   const sendFrames = async (outputDir) => {
//     const files = await RNFS.readDir(outputDir);

//     for (const file of files) {
//       if (ws && ws.readyState === WebSocket.OPEN) {
//         const frameData = await RNFS.readFile(file.path, 'base64');
//         const buffer = Buffer.from(frameData, 'base64');
//         ws.send(buffer);
//         console.log(`Frame sent: ${file.name}`);
//       }
//     }
//   };

//   if (!cameraPermission || !cameraPermission.granted || !microphonePermission || !microphonePermission.granted) {
//     return <Text>Camera and microphone permissions are required to use this feature.</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.connectionStatus}>{connectionStatus}</Text>
//       <Camera
//         ref={cameraRef}
//         style={styles.camera}
//         type={Camera.Constants.Type.front}
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
//       </Camera>
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
// });

// export default VideoStreaming;


import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system'; // Use expo-file-system instead of react-native-fs
import { FFmpegKit } from 'ffmpeg-kit-react-native'; // For video processing

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
  const [videoUri, setVideoUri] = useState(null); // Track video URI after recording

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
        setTimeout(() => setFrameReceived(false), 2000);
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
      if (!cameraPermission) await requestPermission();
      if (!microphonePermission) await requestMicrophonePermission();
    })();
  }, [cameraPermission, microphonePermission]);

//   const startRecording = async () => {
//     if (cameraRef.current && !isRecording) {
//       setIsRecording(true);
//       const videoPath = `${FileSystem.documentDirectory}video.mp4`;

//       await cameraRef.current.recordAsync({
//         quality: '1080p',
//         maxDuration: 0, // No time limit for the recording
//       }).then(async (video) => {
//         console.log('Video saved to:', video.uri);
//         setVideoUri(video.uri); // Save video URI after recording
//       }).catch((err) => console.error('Error during recording:', err));
//     }
//   };

//   const stopRecording = async () => {
//     if (cameraRef.current && isRecording) {
//       cameraRef.current.stopRecording();
//       setIsRecording(false);
//       console.log('Recording stopped');
      
//       if (videoUri) {
//         // Extract frames after recording is stopped
//         const outputDir = `${FileSystem.documentDirectory}frames/`;

//         // Ensure the frames directory exists before proceeding
//         const exists = await FileSystem.getInfoAsync(outputDir);
//         if (!exists.exists) {
//           await FileSystem.makeDirectoryAsync(outputDir);
//         }

//         const ffmpegCommand = `-i ${videoUri} -vf fps=1 ${outputDir}frame%03d.jpg`; // Extract 1 frame per second
//         FFmpegKit.execute(ffmpegCommand).then(async (session) => {
//           const state = await session.getState();
//           if (state === 'COMPLETED') {
//             console.log('Frames extracted successfully');
//             // Transmit frames over WebSocket
//             await sendFrames(outputDir);
//           } else {
//             console.error('FFmpeg execution failed');
//           }
//         });
//       }
//     }
//   };

// const startRecording = async () => {
//     if (cameraRef.current && !isRecording) {
//       setIsRecording(true);
//       // Start recording
//       await cameraRef.current.recordAsync({
//         quality: '1080p',
//         maxDuration: 0, // No time limit for the recording
//       }).catch((err) => console.error('Error during recording:', err));
//     }
//   };
  
const startRecording = async () => {
    if (cameraRef.current && !isRecording) {
      setIsRecording(true);
      // Start recording
      const videorecordpromise = cameraRef.current.recordAsync({
        quality: '1080p',
        maxDuration: 0, // No time limit for the recording
      }).catch((err) => console.error('Error during recording:', err));
      const data = await videorecordpromise;
      console.log("Video recording completed", data.uri);
      setVideoUri(data.uri)
    }
  };
  
//   const stopRecording = async () => {
//     if (cameraRef.current && isRecording) {
//       cameraRef.current.stopRecording(); // Stop recording
//       setIsRecording(false); // Update state
  
//       console.log('Recording stopped');
  
//       // Now process the video (only after stopping the recording)
//       const videoUri = cameraRef.current.getVideoUri();
//       if (videoUri) {
//         console.log('Video saved to:', videoUri);
//         setVideoUri(videoUri); // Save video URI for further processing
  
//         // Extract frames and handle further logic
//         const outputDir = `${FileSystem.documentDirectory}frames/`;
  
//         // Ensure the frames directory exists before proceeding
//         const exists = await FileSystem.getInfoAsync(outputDir);
//         if (!exists.exists) {
//           await FileSystem.makeDirectoryAsync(outputDir);
//         }
  
//         const ffmpegCommand = `-i ${videoUri} -vf fps=1 ${outputDir}frame%03d.jpg`; // Extract 1 frame per second
//         FFmpegKit.execute(ffmpegCommand).then(async (session) => {
//           const state = await session.getState();
//           if (state === 'COMPLETED') {
//             console.log('Frames extracted successfully');
//             // Transmit frames over WebSocket
//             await sendFrames(outputDir);
//           } else {
//             console.error('FFmpeg execution failed');
//           }
//         });
//       }
//     }
//   };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording(); // Stop recording
      setIsRecording(false); // Update state
      console.log('Recording stopped');

      // Ensure FFmpegKit is initialized
      FFmpegKit.getLogLevel().then((logLevel) => {
        console.log('FFmpeg Log Level:', logLevel);
      }).catch((error) => {
        console.error('FFmpegKit initialization failed:', error);
      });
  
      try {  
        // Extract frames from the video using FFmpeg
        const outputDir = `${FileSystem.documentDirectory}frames/`;
    
        // Ensure the frames directory exists before proceeding
        const exists = await FileSystem.getInfoAsync(outputDir);
        if (!exists.exists) {
          await FileSystem.makeDirectoryAsync(outputDir);
        }
    
        const ffmpegCommand = `-i ${videoUri} -vf fps=1 ${outputDir}frame_%03d.jpg`; // Corrected frame naming pattern
        const result = await FFmpegKit.execute(ffmpegCommand);
        const state = await result.getState();
    
        if (state === 'COMPLETED') {
          console.log('Frames extracted successfully');
    
          // Transmit frames over WebSocket
          const files = await FileSystem.readDirectoryAsync(outputDir);
    
          for (const file of files) {
            if (ws && ws.readyState === WebSocket.OPEN) {
              const frameData = await FileSystem.readAsStringAsync(`${outputDir}${file}`, {
                encoding: FileSystem.EncodingType.Base64,
              });
              const buffer = Buffer.from(frameData, 'base64');
              ws.send(buffer); // Send frame over WebSocket
              console.log(`Frame sent: ${file}`);
            }
          }
        } else {
          console.error('FFmpeg execution failed:', await result.getCommandOutputAsync());
        }
      } catch (error) {
        console.error('Error extracting and sending frames:', error);
      }
    }
  }; 
    

//   const sendFrames = async (outputDir) => {
//     try {
//       // Check if the directory exists
//       const exists = await FileSystem.getInfoAsync(outputDir);
//       if (!exists.exists) {
//         console.error('Frames directory does not exist');
//         return;
//       }

//       const files = await FileSystem.readDirectoryAsync(outputDir);
//       if (!files || files.length === 0) {
//         console.error('No frames found in the directory.');
//         return;
//       }

//       for (const file of files) {
//         if (ws && ws.readyState === WebSocket.OPEN) {
//           const frameData = await FileSystem.readAsStringAsync(`${outputDir}${file}`, {
//             encoding: FileSystem.EncodingType.Base64,
//           });
//           const buffer = Buffer.from(frameData, 'base64');
//           ws.send(buffer); // Send frame over WebSocket
//           console.log(`Frame sent: ${file}`);
//         }
//       }
//     } catch (error) {
//       console.error('Error sending frames:', error);
//     }
//   };

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
        mode="video"
      >
        <View style={styles.buttonContainer}>
          {!isRecording ? (
            <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
              <View style={styles.recordButtonInner} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
              <Text style={styles.stopButtonText}>Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
      {frameReceived && (
        <View style={styles.frameReceivedIndicator}>
          <Text style={styles.frameReceivedText}>Frame Received</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  connectionStatus: { textAlign: 'center', padding: 10, backgroundColor: '#e0e0e0', color: '#333' },
  camera: { flex: 1 },
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
  recordButtonInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'red' },
  stopButton: {
    width: 100,
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  stopButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  frameReceivedIndicator: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  frameReceivedText: { color: 'white', fontWeight: 'bold' },
});

export default VideoStreaming;


// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// import { CameraView, useCameraPermissions } from 'expo-camera';
// import { Buffer } from 'buffer'; // For handling binary data

// const VideoStreaming = ({ navigation }) => {
  
//   const [facing, setFacing] = useState('back');
//   const [cameraPermission, requestCameraPermission] = useCameraPermissions();
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [ws, setWs] = useState(null); // WebSocket state

//   const cameraRef = useRef(null);

//   useEffect(() => {
//     // Establish WebSocket connection
//     const websocket = new WebSocket('ws://10.0.2.2:8000/api/ws/video');

//     websocket.onopen = () => {
//       console.log('WebSocket connection opened');
//     };

//     websocket.onmessage = (event) => {
//       console.log('WebSocket message received:', event.data);
//     };

//     websocket.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     websocket.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     setWs(websocket);

//     // Cleanup WebSocket connection on component unmount
//     return () => {
//       if (websocket.readyState === WebSocket.OPEN || websocket.readyState === WebSocket.CONNECTING) {
//         websocket.close();
//       }
//     };
//   }, []);

//   const toggleCameraFacing = () => {
//     setFacing(current => (current === 'back' ? 'front' : 'back'));
//   };

//   // Picture Capture
//   const takePicture = async () => {
//     if (cameraRef.current) {
//       try {
//         const photo = await cameraRef.current.takePictureAsync();
//         setCapturedImage(photo.uri);

//         // Send the captured image over WebSocket
//         await sendPhoto(photo.uri);
//       } catch (error) {
//         console.error("Picture capture failed:", error);
//       }
//     }
//   };

//   // Send Image over WebSocket
//   const sendPhoto = async (uri) => {
//     if (ws && ws.readyState === WebSocket.OPEN) {
//       try {
//         const photoData = await fetch(uri);
//         const blob = await photoData.blob();
//         const reader = new FileReader();

//         reader.onloadend = () => {
//           const base64String = reader.result.split(',')[1]; // Remove data URL prefix
//           ws.send(base64String); // Send the image as a base64 string
//           console.log('Photo sent over WebSocket');
//         };

//         reader.readAsDataURL(blob);
//       } catch (error) {
//         console.error("Error sending photo:", error);
//       }
//     } else {
//       console.error("WebSocket is not open.");
//     }
//   };

//   // Retake Picture Method
//   const retakePicture = () => {
//     setCapturedImage(null);
//   };

//   // Permission Handling
//   if (!cameraPermission) {
//     return <View style={styles.container} />;
//   }

//   if (!cameraPermission.granted) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>Camera permission is required</Text>
//         <TouchableOpacity onPress={requestCameraPermission} style={styles.permissionButton}>
//           <Text style={styles.buttonText}>Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   // Render Preview Screen if Picture is Captured
//   if (capturedImage) {
//     return (
//       <View style={styles.previewContainer}>
//         <Image source={{ uri: capturedImage }} style={styles.previewImage} />
//         <View style={styles.previewButtonContainer}>
//           <TouchableOpacity 
//             style={[styles.actionButton, styles.retakeButton]} 
//             onPress={retakePicture}
//           >
//             <Text style={styles.actionButtonText}>Retake</Text>
//           </TouchableOpacity>
//           <TouchableOpacity 
//             style={[styles.actionButton, styles.saveButton]} 
//           >
//             <Text style={styles.actionButtonText}>Save</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }

//   // Camera Capture Screen
//   return (
//     <View style={styles.container}>
//       <CameraView
//         ref={cameraRef}
//         style={styles.camera}
//         facing={facing}
//         mode="picture"
//       >
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity 
//             style={styles.flipButton} 
//             onPress={toggleCameraFacing}
//           >
//             <Text style={styles.buttonText}>Flip Camera</Text>
//           </TouchableOpacity>
//           <TouchableOpacity 
//             style={styles.captureButton} 
//             onPress={takePicture}
//           >
//             <Text style={styles.buttonText}>Capture</Text>
//           </TouchableOpacity>
//         </View>
//       </CameraView>
//     </View>
//   );
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
//   },
//   captureButton: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginBottom: 30,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   previewContainer: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   previewImage: {
//     flex: 1,
//     resizeMode: 'contain',
//   },
//   previewButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 20,
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
//   saveButton: {
//     backgroundColor: '#4CAF50',
//   },
//   actionButtonText: {
//     color: 'white',
//     fontSize: 18,
//   },
//   message: {
//     color: 'white',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   permissionButton: {
//     backgroundColor: '#2196F3',
//     padding: 15,
//     alignSelf: 'center',
//     borderRadius: 10,
//   },
// });

// export default VideoStreaming;
