import {StyleSheet, Text, View, FlatList, TouchableOpacity,
    TouchableHighlight, Button, Image, Dimensions, Alert, ScrollView} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import firebase from "firebase";
import { createStackNavigator } from '@react-navigation/stack';
import GlobalStyles from "../globalStyling/GlobalStyles";

const Stack = createStackNavigator();


function BookingScreen({navigation}) {
    const [bookings,setBookings] = useState()

    useEffect(() => {
        if(!bookings) {
            firebase
                .database()
                .ref('/Bookings')
                .orderByChild("mail").equalTo(firebase.auth().currentUser.email)
                .on('value', snapshot => {
                    setBookings(snapshot.val())
                });
        }
    },[]);

    if (!bookings) {
        return <Text>Du har ingen bookings</Text>
    }

    const bookingArray = Object.values(bookings)

    return (
            <View style={GlobalStyles.container}>
                <FlatList
                    data={bookingArray}
                    renderItem={({ item }) => {
                        return(
                            <TouchableOpacity style={GlobalStyles.card}>
                                <Text style={GlobalStyles.salonName}>Dato:</Text>
                                <Text style={GlobalStyles.address}>{item.date}</Text>

                                <Text style={GlobalStyles.salonName}>Hos:</Text>
                                <Text style={GlobalStyles.address}>{item.salon}</Text>
                            </TouchableOpacity>
                        )
                    }}
                 />
            </View>
        );
    }

export default BookingScreen