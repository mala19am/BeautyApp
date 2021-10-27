import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./components/HomeScreen";
import SettingsScreen from "./components/SettingsScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStackNavigator from "./components/HomeStackNavigator";
import StackNavigator from "./components/StackNavigator";
import firebase from "firebase";
import {createStackNavigator} from "@react-navigation/stack";

import negle from "./components/salonTypeComponents/negle";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




//Her oprettes en instans af tabnavigator
const Tab = createBottomTabNavigator();

//Her oprettes de tre tekst referencer, der skal benyttes i vores screen komponenter
const homeScreenText = "Dette er HomeScreen!"
const settingsScreenText = "Dette er SettingsScreen!"


function App() {

    const Stack = createStackNavigator();

// Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyC12qwhPX4YJWMOuNfZ3vub9HfV7OGYaPQ",
        authDomain: "beautymmjr.firebaseapp.com",
        databaseURL: "https://beautymmjr-default-rtdb.firebaseio.com",
        projectId: "beautymmjr",
        storageBucket: "beautymmjr.appspot.com",
        messagingSenderId: "897596962609",
        appId: "1:897596962609:web:b8ecad15890b0956d9a210"
    };


    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const StackNavigation = () => {
        return(
            <StackNavigation>
                <Stack.Screen name='Negle' component={negle}/>
            </StackNavigation>

        )
    }

  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Home') {
              return (
                  <Ionicons
                      name={'home-outline'}
                      size={size}
                      color={color}
                  />
              );
            } else if (route.name === 'Settings') {
              return (
                  <Ionicons
                      name='md-settings-outline'
                      size={size}
                      color={color}
                  />
              );
            }
            else{
              return (
                  <Ionicons
                      name='md-list-outline'
                      size={size}
                      color={color}
                  />
              );
            }
          },
        })}
                       tabBarOptions={{
                         activeTintColor: 'blue',
                         inactiveTintColor: 'gray',
                       }}
        >
          <Tab.Screen name="Settings" children={()=><SettingsScreen prop={settingsScreenText}/>} />
          <Tab.Screen name="Home" component={HomeStackNavigator} />
          <Tab.Screen name="Stack" component={StackNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default App