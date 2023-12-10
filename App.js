import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './src/screen/login';
import InitialScreen from './src/screen/initialScreen';
import Home from './src/screen/Home';
import SignUp from './src/screen/signup';
import CreatePost from './src/screen/components/createPost';
import UserProfile from './src/screen/userprofile';
import MyProfile from './src/screen/myProfile';
const Stack = createStackNavigator();
const Drawer =createDrawerNavigator();
export default function App() {

  return (
    
    <NavigationContainer>
      {/* <Drawer.Navigator initialRouteName='Home'>
        
      </Drawer.Navigator> */}
      <Stack.Navigator initialRouteName="InitialScreen">
        <Stack.Screen options={{headerShown: false}} name='InitialScreen' component={InitialScreen} />
        <Stack.Screen options={{headerShown: false}} name='Login' component={Login} />
        <Stack.Screen options={{headerShown: false}} name='Home' component={Home} />
        <Stack.Screen options={{headerShown: false}} name='SignUp' component={SignUp} />
        <Stack.Screen options={{headerShown: false}} name='CreatePost' component={ CreatePost} />
        <Stack.Screen options={{headerShown: false}} name='UserProfile' component={ UserProfile} />
            <Stack.Screen options={{headerShown: false}} name='MyProfile' component={ MyProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


