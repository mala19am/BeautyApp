import * as React from 'react';
import {
    View, Text, Platform, FlatList, StyleSheet,
    Button, Alert, TouchableOpacity, Image, StatusBar, SafeAreaView,
} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";

import {SALONTYPES} from "../const";
import GlobalStyles from "../globalStyling/GlobalStyles";
import CalendarPicker from 'react-native-calendar-picker';


const SalonDetails = ({route,navigation}) => {
    const [salon,setSalon] = useState();
    const [selectedDate, setSelectedDate] = useState('');


    useEffect(() => {
        setSalon(route.params.salon[1]);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setSalon({})
        }
    });

    const onDateChange = date => {
        setSelectedDate(date)
    };



    if (!salon) {
        return <Text>No data</Text>;
    }



    const saveBooking = () => {
        const booking = {
            mail: firebase.auth().currentUser.email,
            salon: salon["name"],
            date: selectedDate.toString()
        }


            firebase
                .database()
                .ref('/Bookings/')
                .push(booking)
        }
    }
    //Gem booking til profil





    //all

    return (
        <View style={styles.container}>
                        <View style={styles.row}>
                            <Text style={styles.value}>{salon["name"]}</Text>
                            <Text style={styles.value}>{salon["address"]}</Text>
                        </View>

            <SafeAreaView style={styles.container}>
                <CalendarPicker
                    onDateChange={ onDateChange}
                />
                <View>
                    <Text>{selectedDate.toString()}</Text>
                </View>

                <View style={styles.bodyContent}>
                    <TouchableOpacity style={GlobalStyles.buttonContainer}>
                        <Text style={GlobalStyles.buttonText}>Book tid</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
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