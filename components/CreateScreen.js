import {Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import GlobalStyles from "../globalStyling/GlobalStyles";


/*
* Metode til at navigere på baggrund af de argumenter, som der sendes med i metode
* Metodens logik udnytter den prædefinerede metode, 'navigate', som navigere ind til det den komponent,
* der hænger sammen med det overførte rutenavn
 */
const navController = (navigation, route) =>{
    navigation.navigate(route)
}


// Metoden sender en videre til når man trykker på knappen 'Opret en ny salon'
function CreateScreen({navigation}) {
    return (
        <View style={GlobalStyles.containerCreateSalon}>
            <Text style={GlobalStyles.textCreateSalon}>Opret en ny salon</Text>
            <TouchableOpacity style={GlobalStyles.buttonContainer} onPress={() => navController(navigation, 'Opret salon')}>
                <Text style={GlobalStyles.buttonText}>Opret en ny salon</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CreateScreen