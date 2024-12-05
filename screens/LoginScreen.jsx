import React, { useState } from 'react'; 
import { View, TextInput, Button, StyleSheet, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleLogin = async () => {

    setLoading(true);

    try {
      if (username === "user" && password === "password") {
        const authToken = 'authToken';
        await AsyncStorage.setItem('authToken', authToken);
        Alert.alert('Login successful', 'You are now logged in!');
        navigation.navigate("Main", { screen: "Home" });
      } 
      else {
        Alert.alert("Invalid credentials"); 
      }
    }
    catch {
      Alert.alert("Please try again.")
    }
    finally {
      setLoading(false);
    }
    
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/favicon.png')} />
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} /> 
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

