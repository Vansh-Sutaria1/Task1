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
