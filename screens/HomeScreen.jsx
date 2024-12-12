// // HomeScreen.jsx
import React from 'react';
import { useState } from 'react';
import { View, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { logout } from '../SessionManagement.js';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const isLoggedOut = await logout();
    if (isLoggedOut) {
      navigation.navigate("Login");
    } else {
      Alert.alert('Error', 'Logout failed. Please try again.');
    }
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.navbar}> 
        <Button title="Settings" onPress={() => alert("Settings Pressed")} />
        <Button title="Logout" onPress={handleLogout} />
        <Button title="View Graphs" onPress={() => 
            navigation.navigate("Main", { screen: "Graphs" })
            // navigation.navigate("Main") this doesnt work since this only opens the drawer and picks the first screen which is home
            } />
      </View>   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  navbar: {
    width: '100%', 
    padding: 20, 
    justifyContent: "flex-start", 
    alignItems: "center", 
    flexDirection: "row", 
    gap: 10, 
  },
});

export default HomeScreen;
