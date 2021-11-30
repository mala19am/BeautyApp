import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    ListRenderItem,
    View,
    Image,
    SafeAreaView,
    TouchableOpacity, Alert, FlatList
} from 'react-native';
import firebase from "firebase";
import GlobalStyles from "../globalStyling/GlobalStyles";
import {Rating} from "react-native-ratings";
import moment from "moment";

const navController = (navigation, route, param) =>{
    navigation.navigate(route, {passing: param})
}

function todayBookingDate(bookingDate) {
    const today = new Date;
    const modToday = moment(today).format('YYYY/MM/DD');
    const modBookingDate = moment(bookingDate).format('YYYY/MM/DD');
    console.log(modBookingDate === modToday);
    return modBookingDate === modToday;
}

const ProfileScreen = ({navigation}) => {

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
        return <Text>Loading</Text>
    }

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

        return (
            <View style={styles.container}>
                <View style={styles.header} />
                <Image style={styles.picture} source={require("../image/profilePicture.jpg")}/>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}> { firebase.auth().currentUser.email } </Text>
                        <View style={styles.bookingButtons}>
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => navController(navigation, "BookingScreen", "future")}>
                                <Text style={styles.buttonText}>Se bookinger</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => navController(navigation, "BookingScreen", "past")}>
                                <Text style={styles.buttonText}>Tidligere bookinger</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={GlobalStyles.textCreateSalon}>Dagens bookings:</Text>
                        <View style={GlobalStyles.container}>
                            <FlatList
                                data={bookingArray}
                                keyExtractor={(item, index) => bookingKeys[index]}
                                renderItem={({item, index}) => {
                                    if (todayBookingDate(item.date)) {
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
            </View>
        );
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#D22D2D",
        height:150,
    },
    testtest:{
        borderWidth: 5,
        borderColor: "black",
        flex: 1,
        height: 200
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