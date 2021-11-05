import {StyleSheet, Text, View, FlatList, TouchableOpacity,
    TouchableHighlight, Button, Image, Dimensions, Alert, ScrollView} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import firebase from "firebase";
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";


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

    if (!salons) {
        return <Text>Du har ingen bookings</Text>
    }


    return (
        <Stack.Navigator

            >
            <View style={styles.container}>
                <FlatList
                    style={styles.contentList}
                    columnWrapperStyle={styles.listContainer}
                    keyExtractor= {(item) => {
                        return item.id;
                    }}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity style={styles.card}>
                                <Image style={styles.image} source={item.image}/>
                                <View style={styles.cardContent}>
                                    <Text style={styles.name}>{item.key}</Text>
                                </View>
                            </TouchableOpacity>
                        )}}/>
            </View>
        );
    }

export default BookingScreen