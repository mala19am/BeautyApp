import * as React from 'react';
import {View, Text, Platform, FlatList, StyleSheet,
        Button, Alert, TouchableOpacity, Image, StatusBar,
        } from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";
import CalendarPicker from "./CalendarPicker";
import {SALONTYPES} from "../const";
import GlobalStyles from "../globalStyling/GlobalStyles";

const SalonDetails = ({route,navigation}) => {
    const [salon,setSalon] = useState()

    useEffect(() => {
        console.log(route);
        setSalon(route.params.salon[1]);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setSalon({})
        }
    });



    if (!salon) {
        return <Text>No data</Text>;
    }

    const navController = (navigation, route) =>{
        navigation.navigate(route)
    }

    //all content
    return (
        <View style={styles.container}>
                        <View style={styles.row}>
                            <Text style={styles.value}>{salon["name"]}</Text>
                            <Text style={styles.value}>{salon["address"]}</Text>
                        </View>

            <View style={styles.calenderContainer}>
                <CalendarPicker/>
            </View>

            <View style={styles.bodyContent}>
                <TouchableOpacity style={GlobalStyles.buttonContainer}>
                    <Text style={GlobalStyles.buttonText}>Book tid</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}


export default SalonDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    calenderContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
        marginTop: 100,
    },
});