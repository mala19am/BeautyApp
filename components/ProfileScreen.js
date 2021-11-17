import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import firebase from "firebase";

const navController = (navigation, route) =>{
    navigation.navigate(route)
}

const ProfileScreen = ({navigation}) => {


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
                        <Text style={styles.name}>Magnus</Text>

                        <TouchableOpacity style={styles.buttonContainer} onPress={() => navController(navigation, "BookingScreen")}>
                            <Text style={styles.buttonText}>Se bookinger</Text>
                        </TouchableOpacity>
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
        height:200,
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
        marginTop:130
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
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#D22D2D"
    },
});

export default ProfileScreen