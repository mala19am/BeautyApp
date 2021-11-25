import {StyleSheet, Text, View, FlatList, TouchableOpacity,
    TouchableHighlight, Button, Image, Dimensions, Alert, ScrollView, SafeAreaView} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import firebase from "firebase";
import { createStackNavigator } from '@react-navigation/stack';
import GlobalStyles from "../globalStyling/GlobalStyles";
import { Rating } from "react-native-ratings"
import moment from "moment";

function getRandomNumber() {
    return Math.floor(Math.random()* 5) + 1;
}

function todayDate(bookingDate) {
    const today = new Date;
    const modToday = moment(today).format('YYYY/MM/DD');
    const modBookingDate = moment(bookingDate).format('YYYY/MM/DD');
    return modBookingDate >= modToday;
}


function BookingScreen({navigation, route}) {
    const [bookings, setBookings] = useState()

    const deleteBooking = (id) => {
        console.log(id);
        firebase
            .database()
            .ref('/Bookings').child(id).remove().then(r => Alert.alert("Booking slettet"))
    }

    useEffect(() => {
        if (!bookings) {
            firebase
                .database()
                .ref('/Bookings')
                .orderByChild("mail").equalTo(firebase.auth().currentUser.email)
                .on('value', snapshot => {
                    setBookings(snapshot.val())
                });
        }
    }, []);

    if (!bookings) {
        return <Text>Du har ingen bookings</Text>
    }

    const bookingArray = Object.values(bookings);
    const bookingKeys = Object.keys(bookings);
    if (route.params["passing"] === "future") {
        return (
            <View style={GlobalStyles.container}>
                <FlatList
                    data={bookingArray}
                    keyExtractor={(item, index) => bookingKeys[index]}
                    renderItem={({item, index}) => {
                        if (todayDate(item.date)) {
                            return (
                                <View style={GlobalStyles.cardBooking}>
                                    <TouchableOpacity>
                                        <Text style={GlobalStyles.salonName}>Dato:</Text>
                                        <Text style={GlobalStyles.address}>{item.date}</Text>
                                        <Text style={GlobalStyles.salonName}>Hos:</Text>
                                        <Text style={GlobalStyles.address}>{item.salon}</Text>
                                    </TouchableOpacity>
                                    <View style={{
                                        width: '100%',
                                        height: 50,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <TouchableOpacity style={GlobalStyles.buttonContainerDelete}
                                                          onPress={() => deleteBooking(bookingKeys[index])}>
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
                                            imageSize={30}
                                            readonly={true}
                                            startingValue={getRandomNumber()}
                                        />
                                    </View>
                                </View>
                            )
                        }
                    }}
                />
            </View>
        );
    } else if (route.params["passing"] === "past" ){
        return (
            <View style={GlobalStyles.container}>
                <FlatList
                    data={bookingArray}
                    keyExtractor={(item, index) => bookingKeys[index]}
                    renderItem={({item, index}) => {
                        if (todayDate(item.date) === false) {
                            return (
                                <View style={GlobalStyles.cardBooking}>
                                    <TouchableOpacity>
                                        <Text style={GlobalStyles.salonName}>Dato:</Text>
                                        <Text style={GlobalStyles.address}>{item.date}</Text>
                                        <Text style={GlobalStyles.salonName}>Hos:</Text>
                                        <Text style={GlobalStyles.address}>{item.salon}</Text>
                                    </TouchableOpacity>
                                    <View style={{
                                        width: '100%',
                                        height: 50,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <TouchableOpacity style={GlobalStyles.buttonContainerDelete}>
                                            <Text style={GlobalStyles.buttonText}>Rate oplevelse</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Rating
                                            type='star'
                                            ratingCount={5}
                                            imageSize={30}
                                            readonly={true}
                                            startingValue={getRandomNumber()}
                                        />
                                    </View>
                                </View>
                            )
                        }
                    }}
                />
            </View>
        );
    }
}

export default BookingScreen