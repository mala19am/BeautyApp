import {StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableHighlight, Button} from "react-native";
import * as React from "react";
import firebase from "firebase";
import {useEffect, useState} from "react";

import negle from "./salonTypeComponents/negle";
import {SALONTYPES} from "../const";


const navController = (navigation, route) =>{
    navigation.navigate(route)
}

//HomeScreen komponenten tager en prop med og printer indholdet af denne i en <Text/>
function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen!</Text>
            <Button title="Negle" onPress={() => navController(navigation, 'Negle')}  />
            <Button title="Frisør" onPress={() => navController(navigation, 'Frisør')}  />
        </View>
    );
}

export default HomeScreen

//Lokal styling til brug i HomeScreen
const styles = StyleSheet.create({
    container: {
        borderColor: 'red',
        borderWidth: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
    },
});