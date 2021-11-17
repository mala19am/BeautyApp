import * as React from "react";

import BookingScreen from "../BookingsScreen";
import ProfileScreen from "../ProfileScreen";

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


function ProfileStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
            <Stack.Screen name='BookingScreen' component={BookingScreen}/>
        </Stack.Navigator>
    )
}

export default ProfileStackNavigator