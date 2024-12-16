// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
// import DocumentPicker from 'react-native-document-picker'; // Import Document Picker
// import { uploadFiles } from '../client'; 

// const UploadFiles = () => {
//   const [files, setFiles] = useState([]);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Handle file selection
//   const handleFileSelection = async () => {
//     try {
//       const results = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles], // Allow all file types
//       });
//       setFiles(results); // Save selected files
//       setError('');
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User canceled file picker');
//       } else {
//         setError('Error selecting files');
//       }
//     }
//   };

//   // Handle file upload
//   const handleFileUpload = async () => {
//     if (files.length === 0) {
//       setError('No files selected. Please choose files to upload.');
//       return;
//     }

//     setLoading(true);
//     setMessage('');
//     setError('');

//     try {
//       // Call the uploadFiles function from client.js
//       const success = await uploadFiles(files);

//       if (success) {
//         setMessage('Files uploaded successfully');
//         setFiles([]); // Clear files after upload
//       } else {
//         setError('Failed to upload files');
//       }
//     } catch (err) {
//       setError('Error uploading files');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Upload Files</Text>

//       {/* File selection button */}
//       <Button title="Select Files" onPress={handleFileSelection} disabled={loading} />

//       {/* Upload Button */}
//       <Button
//         title={loading ? 'Uploading...' : 'Upload'}
//         onPress={handleFileUpload}
//         disabled={loading || files.length === 0}
//       />

//       {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

//       {/* Display Messages */}
//       {message && <Text style={[styles.message, styles.success]}>{message}</Text>}
//       {error && <Text style={[styles.message, styles.error]}>{error}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   loader: {
//     marginTop: 10,
//   },
//   message: {
//     marginTop: 15,
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   success: {
//     color: 'green',
//   },
//   error: {
//     color: 'red',
//   },
// });

// export default UploadFiles;


import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker'; // Import expo-document-picker
import { uploadFiles } from '../client'; 

const UploadFiles = () => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileSelection = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allow all file types
      });

      if (result.type === 'success') {
        setFiles([result]); // Save selected file
        setError('');
      } else {
        console.log('File selection canceled');
      }
    } catch (err) {
      setError('Error selecting files');
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (files.length === 0) {
      setError('No files selected. Please choose files to upload.');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Call the uploadFiles function from client.js
      const success = await uploadFiles(files);

      if (success) {
        setMessage('Files uploaded successfully');
        setFiles([]); // Clear files after upload
      } else {
        setError('Failed to upload files');
      }
    } catch (err) {
      setError('Error uploading files');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Files</Text>

      {/* File selection button */}
      <Button title="Select Files" onPress={handleFileSelection} disabled={loading} />

      {/* Upload Button */}
      <Button
        title={loading ? 'Uploading...' : 'Upload'}
        onPress={handleFileUpload}
        disabled={loading || files.length === 0}
      />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

      {/* Display Messages */}
      {message && <Text style={[styles.message, styles.success]}>{message}</Text>}
      {error && <Text style={[styles.message, styles.error]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loader: {
    marginTop: 10,
  },
  message: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
});

export default UploadFiles;

