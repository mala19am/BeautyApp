import * as React from 'react';
import {
    View, Text, Platform, FlatList, StyleSheet,
    Button, Alert, TouchableOpacity, Image, StatusBar, SafeAreaView,
} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";
import GlobalStyles from "../globalStyling/GlobalStyles";
import CalendarPicker from 'react-native-calendar-picker';
//import Rating from 'react-native-ratings';


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


    const handleSave = () => {
        const booking = {
            mail: firebase.auth().currentUser.email,
            salon: salon["name"],
            date: selectedDate.toString().slice(0,15)
        }
        if(booking.date.length === 0) {
            return Alert.alert('Vælg venligst en dato.')
        }

            firebase
                .database()
                .ref('/Bookings/')
                .push(booking);
            Alert.alert("Booking gemt.")
    }
    //Gem booking til profil





    //all

    return (
        <View style={styles.container}>
                        <View style={GlobalStyles.row}>
                            <Text style={GlobalStyles.textSalons}>{salon["name"]}</Text>
                            <Text style={GlobalStyles.textSalons}>{salon["address"]}</Text>
                        </View>

            <SafeAreaView style={styles.container}>
                <CalendarPicker
                    onDateChange={ onDateChange}
                />
                <View>
                    <Text>{selectedDate.toString()}</Text>
                </View>

                <View style={styles.bodyContent}>
                    <TouchableOpacity style={GlobalStyles.buttonContainer} onPress={() => handleSave()}>
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
        marginTop:5,
    },
});