import * as React from "react";
import CreateSalon from "../stackComponents/CreateSalon";
import ScreenTwo from "../stackComponents/ScreenTwo";
import CreateScreen from "../CreateScreen";
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();


function StackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Details"
        >
            <Stack.Screen name="Admin" component={CreateScreen}
                          options={{
                              headerTitleAlign: 'center',
                              headerTitleStyle: {color: 'white'},
                              headerStyle: {backgroundColor: '#D22D2D'}}
                          }
            />
            <Stack.Screen name="Opret salon" component={CreateSalon}
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
export default StackNavigator