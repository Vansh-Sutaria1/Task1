import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions, Camera } from 'expo-camera';

const VideoStreaming = () => {
    const cameratypes =  {
        back : 'back'
    }
    
    const cameraRef = useRef(null);
    const [facing, setFacing] = useState(cameratypes.back);
    const [cameraPermission, requestPermission] = useCameraPermissions();
    const [isRecording, setIsRecording] = useState(false);
    const [recordedVideoUri, setRecordedVideoUri] = useState(null);

    useEffect(() => {
    if (!cameraPermission) {
        requestPermission(); // Request permission if not granted
    }
    }, [cameraPermission, requestPermission]);

    if (!cameraPermission || !cameraPermission.granted) {

        return <Text>Camera permissions are required to use this feature.</Text>;
    }

    const toggleCameraFacing = () => {
        setFacing(facing === cameraTypes.back ? cameraTypes.front : cameraTypes.back);
    };
    // .props to read 
    
    const startRecording = () => {
        if (cameraRef.current) {
            cameraRef.current.recordAsync()
                .then((video) => {
                    console.log("Recording....."); // You can access the video details here
                })
                .catch((error) => {
                    console.error("Error recording video:", error);
                });
        }
    };
       

    // Stop Video Recording
    const stopRecording = () => {
    if (cameraRef.current) {
        cameraRef.current.stopRecording();
    }
    };

    // Retake Video
    const retakeVideo = () => {
    setRecordedVideoUri(null);
    };


    // Video Preview Screen
    if (recordedVideoUri) {
    return (
        <View style={styles.previewContainer}>
        <Text style={styles.previewMessage}>Video Recorded Successfully</Text>
        <View style={styles.previewButtonContainer}>
            <TouchableOpacity
            style={[styles.actionButton, styles.retakeButton]}
            onPress={retakeVideo}
            >
            <Text style={styles.actionButtonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.actionButton, styles.playButton]}
            onPress={() => {
                Alert.alert('Video Recorded', 'Video is ready for further processing');
            }}
            >
            <Text style={styles.actionButtonText}>Review</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
    }

    // Camera Video Recording Screen
    return (
    <View style={styles.container}>
        <CameraView
        ref={cameraRef}
        style={styles.camera}
        type = {cameratypes.back} 
        >
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
            <Text style={styles.buttonText}>Flip Camera</Text>
            </TouchableOpacity>

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
    marginRight: 20,
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewMessage: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  previewButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
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
  playButton: {
    backgroundColor: '#4CAF50',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
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
  message: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
  },
});

export default VideoStreaming;


