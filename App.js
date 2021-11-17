import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/ProfileScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStackNavigator from "./components/StackNavigators/HomeStackNavigator";
import StackNavigator from "./components/StackNavigators/StackNavigator";
import ProfileStackNavigator from "./components/StackNavigators/ProfileStackNavigator";
import firebase from "firebase";
import {createStackNavigator} from "@react-navigation/stack";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Profile from "./components/ProfileScreen";
import {ADMINS} from "./const"

import negle from "./components/salonTypeComponents/negle";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




//Her oprettes en instans af tabnavigator
const Tab = createBottomTabNavigator();




function App() {

    //Her oprettes bruger state variblen
    const [user, setUser] = useState({ loggedIn: false });

    const Stack = createStackNavigator();

// Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyC12qwhPX4YJWMOuNfZ3vub9HfV7OGYaPQ",
        authDomain: "beautymmjr.firebaseapp.com",
        projectId: "beautymmjr",
        storageBucket: "beautymmjr.appspot.com",
        messagingSenderId: "897596962609",
        appId: "1:897596962609:web:b8ecad15890b0956d9a210"
    };


    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }


//onAuthstatechanged er en prædefineret metode, forsynet af firebase, som konstant observerer brugerens status (logget ind vs logget ud)
//Pba. brugerens status foretages et callback i form af setUSer metoden, som håndterer user-state variablens status.
    function onAuthStateChange(callback) {
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback({loggedIn: true, user: user});
            } else {
                callback({loggedIn: false});
            }
        });
    }

    //Heri aktiverer vi vores listener i form af onAuthStateChanged, så vi dynamisk observerer om brugeren er aktiv eller ej.
    useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        return () => {
            unsubscribe();
        };
    }, []);

//Her oprettes gæstekomponentsindhold, der udgøres af sign-up og login siderne
    const GuestPage = () => {
        return(
            <View style={styles.container}>
                <Text style={styles.paragraph}>
                    Opret eller Login med din Email
                </Text>

                <Card style={{padding:20}}>
                    <SignUpForm />
                </Card>

                <Card style={{padding:20}}>
                    <LoginForm />
                </Card>

            </View>
        )
    }


  return user.loggedIn ?
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Kategorier') {
              return (
                  <Ionicons
                      name={'earth-outline'}
                      size={size}
                      color={color}
                  />
              );
            } else if (route.name === 'Profile') {
              return (
                  <Ionicons
                      name='person-circle-outline'
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
          <Tab.Screen name="Profile" component={ProfileStackNavigator} />
          <Tab.Screen name="Kategorier" component={HomeStackNavigator} />
            {
                ADMINS.includes(firebase.auth().currentUser.email)
                    && <Tab.Screen name="Stack" component={StackNavigator} />
            }
        </Tab.Navigator>
      </NavigationContainer> : <GuestPage/> ;



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: 'transparent',
        padding: 20,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default App