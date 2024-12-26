//LoginScreen.jsx
import React, { useState } from 'react'; 
import { View, TextInput, Button, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import {loginn} from '../client.js';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleLogin = async () => {
    setLoading(true);
    try {
      const isValid = await loginn(username, password);
      if (isValid) {
        Alert.alert('Login successful', 'You are now logged in!');
        // setLoading(false); // temporary
        navigation.navigate("Main");
      } else {
        Alert.alert('Invalid credentials', 'Please check your username and password.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error(error);
    } finally {
      setLoading(false); 
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Image style={styles.logo} source={require('../assets/favicon.png')} />
          <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 50, 
    height: 50, 
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    padding: 10,
    width: "60%",
    borderWidth: 2,
  },
});

export default LoginScreen;


// import React, { useState } from 'react'; 
// import { View, TextInput, Button, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
// import { loginn } from '../client.js';

// const LoginScreen = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false); 

//   const handleLogin = async () => {
//     if (!username || !password) {
//       Alert.alert('Error', 'Please enter both username and password');
//       return;
//     }

//     setLoading(true);
//     try {
//       const isValid = await loginn(username, password);
//       if (isValid) {
//         // Reset form state before navigation
//         setUsername('');
//         setPassword('');
//         setLoading(false);  // Clear loading before navigation
        
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'Main' }],
//         });
//       } else {
//         setLoading(false);
//         Alert.alert('Invalid credentials', 'Please check your username and password.');
//       }
//     } catch (error) {
//       setLoading(false);
//       Alert.alert('Error', 'An unexpected error occurred. Please try again.');
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image style={styles.logo} source={require('../assets/favicon.png')} />
      
//       <View style={styles.formContainer}>
//         <TextInput 
//           style={styles.input} 
//           placeholder="Username" 
//           value={username} 
//           onChangeText={setUsername}
//           editable={!loading}
//         />
//         <TextInput 
//           style={styles.input} 
//           placeholder="Password" 
//           secureTextEntry 
//           value={password} 
//           onChangeText={setPassword}
//           editable={!loading}
//         />
        
//         {loading ? (
//           <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
//         ) : (
//           <Button title="Login" onPress={handleLogin} disabled={loading} />
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   formContainer: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 50, 
//     height: 50, 
//     marginBottom: 20,
//   },
//   input: {
//     marginBottom: 20,
//     padding: 10,
//     width: "80%",
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   loader: {
//     marginTop: 10,
//   }
// });

// export default LoginScreen;