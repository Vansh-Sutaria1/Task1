import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";

import LoginScreen from './screens/LoginScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import GraphScreen from './screens/GraphScreen.jsx';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Graphs" component={GraphScreen} />
  </Drawer.Navigator>
);

const MyStack = () => { 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen 
          name="Main" 
          component={DrawerNavigator} 
          options={{ headerShown: false }} // Hides the header for the drawer means?
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MyStack;

