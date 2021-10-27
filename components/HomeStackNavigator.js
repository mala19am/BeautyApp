import * as React from "react";
import negle from "./salonTypeComponents/negle";

import HomeScreen from "./HomeScreen";
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();


function HomeStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Home Screen"
        >
            <Stack.Screen name="Home Screen" component={HomeScreen}
                          options={{
                              headerTitleAlign: 'center',
                              headerTitleStyle: {color: 'white'},
                              headerStyle: {backgroundColor: '#ba6262'}}
                          }
            />
            <Stack.Screen name="Negle" component={negle} options={{
                headerTitleStyle: { textAlign: 'right', color: 'white' },
                headerStyle: {backgroundColor: '#62bab5'}
            }} />
        </Stack.Navigator>
    )
}

//Eksport af den funktionelle komponent, således den kan importeres i andre komponenter
export default HomeStackNavigator