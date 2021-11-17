import {StyleSheet, Text, View, FlatList, TouchableOpacity,
    TouchableHighlight, Button, Image, Dimensions, Alert, ScrollView, SafeAreaView} from "react-native";
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
                            <View style={GlobalStyles.card}>
                                <TouchableOpacity>
                                    <Text style={GlobalStyles.salonName}>Dato:</Text>
                                    <Text style={GlobalStyles.address}>{item.date}</Text>
                                    <Text style={GlobalStyles.salonName}>Hos:</Text>
                                    <Text style={GlobalStyles.address}>{item.salon}</Text>
                                </TouchableOpacity>
                                <View style={{width: '100%', height:50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <TouchableOpacity style={GlobalStyles.buttonContainerDelete}>
                                        <Text style={GlobalStyles.buttonText}>Slet booking</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={GlobalStyles.buttonContainerDelete}>
                                        <Text style={GlobalStyles.buttonText}>Redigér booking</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                 />
            </View>
        );
    }

export default BookingScreen