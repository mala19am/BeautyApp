import {StyleSheet, Text, View, FlatList, TouchableOpacity,
    TouchableHighlight, Button, Image, Dimensions, Alert, ScrollView, SafeAreaView} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import firebase from "firebase";
import { createStackNavigator } from '@react-navigation/stack';
import GlobalStyles from "../globalStyling/GlobalStyles";
import { Rating } from "react-native-ratings"

const Stack = createStackNavigator();


function BookingScreen({navigation}) {
    const [bookings,setBookings] = useState()
    let RandomNumber = Math.floor(Math.random() * 5) + 1 ;


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
                                <View>
                                    <Rating
                                        type='star'
                                        ratingCount={5}
                                        imageSize={40}
                                        isDisabled = { true }
                                        startingValue= { RandomNumber }
                                    />
                                </View>
                            </View>
                        )
                    }}
                 />
            </View>
        );
    }

export default BookingScreen