import React from "react";
import { View, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}> 
        <Button title="View Graphs" onPress={() => navigation.navigate("Main", { screen: "Graphs" })} />
        <Button title="Settings" onPress={() => alert("Settings Pressed")} />
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
