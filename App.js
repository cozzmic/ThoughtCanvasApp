import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screen/login';
import InitialScreen from './src/screen/initialScreen';
import Home from './src/screen/Home';
import SignUp from './src/screen/signup'

const Stack = createStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InitialScreen">
        <Stack.Screen options={{headerShown: false}} name='InitialScreen' component={InitialScreen} />
        <Stack.Screen options={{headerShown: false}} name='Login' component={Login} />
        <Stack.Screen options={{headerShown: false}} name='Home' component={Home} />
        <Stack.Screen options={{headerShown: false}} name='SignUp' component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


