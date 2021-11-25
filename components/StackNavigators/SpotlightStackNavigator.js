import * as React from "react";
import Spotlight from "../SpotlightScreen";
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet} from "react-native";


const Stack = createStackNavigator();


function SpotlightStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Spotlight"
        >
            <Stack.Screen name="Spotlight" component={Spotlight}
                          options={{
                              headerTitleAlign: 'center',
                              headerTitleStyle: {color: 'white'},
                              headerStyle: {backgroundColor: '#D22D2D'}}
                          }
            />
        </Stack.Navigator>
    )
}



//Eksport af den funktionelle komponent, således den kan importeres i andre komponenter
export default SpotlightStackNavigator