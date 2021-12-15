import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert, FlatList } from 'react-native';
import firebase from "firebase";
import GlobalStyles from "../globalStyling/GlobalStyles";
import {Rating} from "react-native-ratings";
import moment from "moment";

/*
* Metode til at navigere på baggrund af de argumenter, som der sendes med i metode
* Metodens logik udnytter den prædefinerede metode, 'navigate', som navigere ind til det den komponent,
* der hænger sammen med det overførte rutenavn
 */
const navController = (navigation, route, param) =>{
    navigation.navigate(route, {passing: param})
}

// En funktion som laver et tilfældigt nummer mellem 1 og 5.
// Skal bruges til rating
function getRandomNumber() {
    return Math.floor(Math.random()* 5) + 1;
}

// Metoden tager den nuværende dato og indlagte dato og matcher den.
// Metoden retunerer true hvis det er den samme og false hvis ikke.
function todayBookingDate(bookingDate) {
    const today = new Date;
    const modToday = moment(today).format('YYYY/MM/DD');
    const modBookingDate = moment(bookingDate).format('YYYY/MM/DD');
    return modBookingDate === modToday;
}

const ProfileScreen = ({navigation}) => {

    // Instantiering af state-variabler til bookings
    const [bookings, setBookings] = useState()

    const deleteBooking = (id) => {
        firebase
            .database()
            .ref('/Bookings').child(id).remove().then(r => Alert.alert("Booking slettet"))
    }

    // Følgende henter alle bookings med brugerens mail i mail attributten.
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

    // Returnerer text, hvis der ikke er nogle bookings
    if (!bookings) {
        return <Text>Loading</Text>
    }

    // Gemmer bookings i variabler
    const bookingArray = Object.values(bookings);
    const bookingKeys = Object.keys(bookings);

    //handleLogout håndterer log ud af en aktiv bruger.
    //Metoden er en prædefineret metode, som firebase stiller tilrådighed
    //Metoden er et asynkrontkald.
    const handleLogOut = async () => {
        await firebase.auth().signOut();
    };

    //Hvis der af en eller anden grund ikke skulle være muligt at fremfinde den aktive bruger,
    //skal der udprintes en besked om dette igennem en tekstkomponent
    if (!firebase.auth().currentUser) {
        return <View><Text>Not found</Text></View>;
    }
        // Returnerer to knapper samt en flatlist med dagens bookinger som gør brug af metoden todayBookingDate.
        // Flatlisten får en slet booking knap som gør brug af deleteBooking. En rediger knap, som lige nu ikke har nogen funktion.
        // Samt en betal med mobilepay knap, hvor man bliver ført hen til MobilePayScreen.js
        // I bunden befinder sig en log ud knap, som gør brug af handleLogOut metoden.
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header} />
                <Image style={styles.picture} source={require("../image/profilePicture.jpg")}/>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}> { firebase.auth().currentUser.email } </Text>
                        <View style={styles.bookingButtons}>
                            <TouchableOpacity style={GlobalStyles.buttonContainer2} onPress={() => navController(navigation, "BookingScreen", "future")}>
                                <Text style={styles.buttonText}>Se bookinger</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={GlobalStyles.buttonContainer2} onPress={() => navController(navigation, "BookingScreen", "past")}>
                                <Text style={styles.buttonText}>Tidligere bookinger</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.name}>Dagens bookings:</Text>
                        <View style={styles.testtest}>
                            <FlatList
                                data={bookingArray}
                                keyExtractor={(item, index) => bookingKeys[index]}
                                renderItem={({item, index}) => {
                                    if (todayBookingDate(item.date) === true) {
                                        return (
                                            <View style={GlobalStyles.cardBooking}>
                                                <TouchableOpacity>
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
                                                    <TouchableOpacity style={GlobalStyles.mobilePayButton}
                                                                      onPress={() => navController(navigation, "MobilePayScreen")}>
                                                        <Image style={styles.picture2} source={require("../image/Button-Betal-med-MobilePay-S-8-Blue.png")}/>
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

                        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleLogOut()}>
                            <Text style={styles.buttonText}>Log ud</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#D22D2D",
        height:150,
    },
    testtest:{
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 10,
        alignItems: 'center',
        marginBottom:20,
        borderRadius:30,
    },
    picture: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:80
    },
    picture2: {
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:80,
        flex:1
    },
    name:{
        fontSize:22,
        color:"#696969",
        fontWeight:'600',
    },
    body:{
        marginTop:40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
    },
    buttonText:{
        fontSize:14,
        color: "#FFFFFF",
        fontWeight: "600"
    },
    info:{
        fontSize:16,
        color: "#D22D2D",
        marginTop:10
    },
    description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 10,
        alignItems: 'center',
        marginBottom:20,
        width:150,
        borderRadius:30,
        backgroundColor: "#D22D2D",
    },
    bookingButtons: {
        flexDirection: "row",
        flex: 1,
        marginBottom: 80,
    }
});

export default ProfileScreen