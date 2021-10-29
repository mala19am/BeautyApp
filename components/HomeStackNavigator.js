import * as React from "react";
import negle from "./salonTypeComponents/negle";
import Frisør from "./salonTypeComponents/Frisør";
import SalonDetails from "./SalonDetails";

import HomeScreen from "./HomeScreen";
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
            <Stack.Screen name='SalonDetails' component={SalonDetails}/>
        </Stack.Navigator>
    )
}



//Eksport af den funktionelle komponent, således den kan importeres i andre komponenter
export default HomeStackNavigator