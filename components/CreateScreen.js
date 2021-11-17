import {Button, StyleSheet, Text, View} from "react-native";
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


/*
 * CreateScreen tager 'navigation' med som argument. navigation er en automatisk prædefineret prop, der kan refereres til i alle screen komponenter.
 *Se dokumentationen for mere info: https://reactnavigation.org/docs/navigation-prop/
 *
 *Derudover styles CreateScreen, som indeholder omfatter to button komponenter, der benytters til at aktivere vores navController metode
 */
function CreateScreen({navigation}) {
    return (
        <View style={GlobalStyles.containerCreateSalon}>
            <Text style={GlobalStyles.textCreateSalon}>Opret en ny salon</Text>
            <Button style={GlobalStyles.buttonCreateSalon} title="Tryk for at oprette en salon" onPress={() => navController(navigation, 'ScreenOne')}>
                    <Text style={GlobalStyles.buttonText}>Se bookinger</Text>
            </Button>
        </View>
    );
}

export default CreateScreen