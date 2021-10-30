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
            {
                Object.entries(salon).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            <Text style={styles.label}>{item[0]} </Text>
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
            <View>
                <CalendarPicker/>
                <TouchableOpacity style={GlobalStyles.buttonContainer}>
                    <Text style={styles.buttonText}>Book tid</Text>
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
        marginTop: 100,
    },
});