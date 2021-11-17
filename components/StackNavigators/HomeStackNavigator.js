import * as React from "react";
import negle from "../salonTypeComponents/negle";
import Frisør from "../salonTypeComponents/Frisør";
import Øjenvipper from "../salonTypeComponents/Øjenvipper";
import Bryn from "../salonTypeComponents/Bryn";
import Massage from "../salonTypeComponents/Massage";
import SalonDetails from "../SalonDetails";
import BookingScreen from "../BookingsScreen";
import ProfileScreen from "../ProfileScreen";

import HomeScreen from "../HomeScreen";
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet} from "react-native";


const Stack = createStackNavigator();


function HomeStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Home Screen"
        >
            <Stack.Screen name="Kategorier" component={HomeScreen}
                          options={{
                              headerTitleAlign: 'center',
                              headerTitleStyle: {color: 'white'},
                              headerStyle: {backgroundColor: '#ba6262'}}
                          }
            />
            <Stack.Screen name="Negle" component={negle}/>
            <Stack.Screen name="Frisør" component={Frisør}/>
            <Stack.Screen name="Bryn" component={Bryn}/>
            <Stack.Screen name="Øjenvipper" component={Øjenvipper}/>
            <Stack.Screen name="Massage" component={Massage}/>
            <Stack.Screen name='SalonDetails' component={SalonDetails}/>
            <Stack.Screen name='BookingScreen' component={BookingScreen}/>
            <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
        </Stack.Navigator>
    )
}



//Eksport af den funktionelle komponent, således den kan importeres i andre komponenter
export default HomeStackNavigator