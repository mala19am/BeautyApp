import {StyleSheet, Text, View, FlatList, TouchableOpacity, Alert} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import firebase from "firebase";
import GlobalStyles from "../globalStyling/GlobalStyles";
import { Rating } from "react-native-ratings"
import moment from "moment";
import Modal from "react-native-modal";

// En funktion som laver et tilfældigt nummer mellem 1 og 5.
// Skal bruges til rating
function getRandomNumber() {
    return Math.floor(Math.random()* 5) + 1;
}

// Metoden tager den nuværende dato og indlagte dato og matcher den.
// Metoden retunerer true hvis det er den samme og false hvis ikke.
function todayDate(bookingDate) {
    const today = new Date;
    const modToday = moment(today).format('YYYY/MM/DD');
    const modBookingDate = moment(bookingDate).format('YYYY/MM/DD');
    return modBookingDate >= modToday;
}


function BookingScreen({navigation, route}) {

    // Instantiering af state-variabler til oprettelse af en ny booking
    const [bookings, setBookings] = useState();

    // Instantiering af state-variabler til vise en modal
    const [isModalVisible, setModalVisible] = useState(false);

    // Følgende state-variabel bruges på nuværende tidspunkt ikke.
    // Den kan dog bruges hvis ratingen skal pushes til en database.
    const [modalRating, setModalRating] = useState();

    // Metode som sætter rating
    const onSwipeRating = rating => {
        setModalRating(rating)
    };

    // Metode som afgører om modal skal vises.
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Metode til at slette bookings
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
        return <Text>Du har ingen bookings</Text>
    }

    // Gemmer bookings i variabler
    const bookingArray = Object.values(bookings);
    const bookingKeys = Object.keys(bookings);

    // Hvis den medsendte param er 'future' vises følgende
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
        // Hvis den medsendte param er 'past' vises følgende
    } else if (route.params["passing"] === "past" ){
        return (
            <View style={GlobalStyles.container}>
                <FlatList
                    data={bookingArray}
                    keyExtractor={(item, index) => bookingKeys[index]}
                    renderItem={({item}) => {
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
                                        <TouchableOpacity style={GlobalStyles.buttonContainerDelete}
                                                          onPress={toggleModal}>
                                            <Text style={GlobalStyles.buttonText}>Rate oplevelse</Text>
                                        </TouchableOpacity>
                                        <Modal isVisible={isModalVisible}
                                               backdropColor="#FFFFFF"
                                               backdropOpacity={0.9}
                                               coverScreen = {true}
                                               style={styles.modal}>
                                            <View style={{flex: 1}}>
                                                <Rating
                                                    type='star'
                                                    ratingCount={5}
                                                    startingValue={1}
                                                    imageSize={30}
                                                    readonly={false}
                                                    onFinishRating={ onSwipeRating}
                                                    style={styles.modalRatingStyle}
                                                />

                                                <TouchableOpacity style={GlobalStyles.buttonContainer} onPress={toggleModal}>
                                                    <Text style={GlobalStyles.buttonText2}>Anmeld</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={GlobalStyles.buttonContainer} onPress={toggleModal}>
                                                    <Text style={GlobalStyles.buttonText2}>Afbryd</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </Modal>
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

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '80%',
    },
    modalRatingStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
});

export default BookingScreen