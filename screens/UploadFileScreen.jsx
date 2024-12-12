import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { uploadFiles } from '../client'; 

const UploadFiles = () => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileSelection = (event) => {
    setFiles(event.target.files);
  };

  // Handle file upload
  const handleFileUpload = async () => {
    try {
      setLoading(true)
      // Call the uploadFiles function from client.js
      const success = await uploadFiles(files);

      if (success) {
        setLoading(false);
        setMessage('Files uploaded successfully');
        setError('');
      } else {
        setLoading(false);
        setError('Failed to upload files');
        setMessage('');
      }
    } catch (err) {
      setError('Error uploading files');
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Files</Text>

      {/* Simulating file selection */}
      <Button title="Select Files" onPress={handleFileSelection}  />

      {/* Upload Button */}
      <Button
        title={loading ? 'Uploading...' : 'Upload'}
        onPress={handleFileSelection} // Reused the file selection for demo
        disabled={loading}
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


// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
// import DocumentPicker from 'react-native-document-picker'; // Import Document Picker
// import { uploadFiles } from '../client'; 

// const UploadFiles = () => {
//   const [files, setFiles] = useState([]);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Handle file selection using DocumentPicker
//   const handleFileSelection = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//       });
//       setFiles(res); // Set the selected file(s)
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User canceled the picker');
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
//         setFiles([]); // Reset files after successful upload
//       } else {
//         setError('Failed to upload files.');
//       }
//     } catch (err) {
//       setError('Error uploading files.');
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
