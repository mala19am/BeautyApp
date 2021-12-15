import * as React from 'react';
import {
    View, Text, StyleSheet,Alert, TouchableOpacity, SafeAreaView,
} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";
import GlobalStyles from "../globalStyling/GlobalStyles";
import CalendarPicker from 'react-native-calendar-picker';
import moment from "moment";


const SalonDetails = ({route,navigation}) => {

    // Instantiering af state-variabler til salon
    const [salon,setSalon] = useState();

    // Instantiering af state-variabler til at hente den valgte dato
    const [selectedDate, setSelectedDate] = useState('');

    // Metoden tager den medsendte parameter og sætter den som salon
    useEffect(() => {
        console.log(route.params.salon[1]);
        setSalon(route.params.salon[1]);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setSalon({})
        }
    });

    // Metoden sætter date til at være selectedDate
    const onDateChange = date => {
        setSelectedDate(date)
    };

    // Hvis der ikk er nogle saloner
    if (!salon) {
        return <Text>No data</Text>;
    }


    // Metoden sætter de forskellige attributter i booking
    // Metoden tjekker herefter om en dato er valgt.
    // Metoden gemmer til sidst bookingen ved at pushe den til databasen.
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

    // Returnerer en calendar picker hvori man kan vælge datoer samt en knap som gemmer bookingen.
    return (
        <View style={styles.container}>
                        <View style={GlobalStyles.row}>
                            <Text style={GlobalStyles.textSalons}>{salon["name"]}</Text>
                            <Text style={GlobalStyles.textSalons}>{salon["address"]}</Text>
                        </View>

            <SafeAreaView style={styles.container}>
                <CalendarPicker
                    onDateChange={ onDateChange}
                    restrictMonthNavigation={ true }
                    selectedDayColor={'red'}
                />
                <View>
                    <Text>{moment(selectedDate).format('DD/MM/YYYY')}</Text>
                </View>

                <View style={GlobalStyles.bodyContent}>
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
});