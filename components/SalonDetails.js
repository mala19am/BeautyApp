import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";

const SalonDetails = ({route,navigation}) => {
    const [salon,setSalon] = useState({});

    useEffect(() => {
        /*Henter car values og sætter dem*/
        console.log(route.params);
        setSalon(route.params.salon[1]);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setSalon({})
        }
    });



    if (!salon) {
        return <Text>No data</Text>;
    }

    //all content
    return (
        <View style={styles.container}>
            {
                Object.entries(salon).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores car keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores car values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default SalonDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});