import * as React from "react";

import BookingScreen from "../BookingsScreen";
import ProfileScreen from "../ProfileScreen";
import MobilePay from "../MobilePayScreen";

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


function ProfileStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profil" component={ProfileScreen}/>
            <Stack.Screen name='BookingScreen' component={BookingScreen}/>
            <Stack.Screen name='MobilePayScreen' component={MobilePay}/>
        </Stack.Navigator>
    )
}

export default ProfileStackNavigator