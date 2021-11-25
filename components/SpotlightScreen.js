import {StyleSheet, Text, View, FlatList, TouchableOpacity} from "react-native";
import * as React from "react";
import GlobalStyles from "../globalStyling/GlobalStyles";


function getRandomNumber() {
    return Math.floor(Math.random()* 5) + 1;
}

//HomeScreen komponenten tager en prop med og printer indholdet af denne i en <Text/>
const Spotlight = ({navigation}) => {
    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.text}>Hej</Text>
        </View>
    );

}

export default Spotlight
