import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStackNavigator from "./components/StackNavigators/HomeStackNavigator";
import StackNavigator from "./components/StackNavigators/StackNavigator";
import ProfileStackNavigator from "./components/StackNavigators/ProfileStackNavigator";
import SpotlightStackNavigator from "./components/StackNavigators/SpotlightStackNavigator";
import firebase from "firebase";
import {createStackNavigator} from "@react-navigation/stack";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import SpotlightScreen from "./components/SpotlightScreen"
import Profile from "./components/ProfileScreen";
import {ADMINS} from "./const"




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
            if (route.name === 'Find') {
              return (
                  <Ionicons
                      name={'earth-outline'}
                      size={size}
                      color={color}
                  />
              );
            } else if (route.name === 'Profil') {
              return (
                  <Ionicons
                      name='person-circle-outline'
                      size={size}
                      color={color}
                  />
              );
            } else if (route.name === 'Spotlight') {
            return (
            <Ionicons
            name='flashlight-outline'
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
          <Tab.Screen name="Spotlight" component={SpotlightStackNavigator}/>
          <Tab.Screen name="Profil" component={ProfileStackNavigator} />
          <Tab.Screen name="Find" component={HomeStackNavigator} />
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