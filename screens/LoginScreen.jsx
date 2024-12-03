import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === "user" && password === "password") {
      // navigation.navigate("Home"); 
      navigation.navigate("Main", { screen: "Home" });

    } else {
      alert("Invalid credentials"); 
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

