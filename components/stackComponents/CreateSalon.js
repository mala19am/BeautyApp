import {
    Button, StyleSheet, Text, View,
    SafeAreaView, ScrollView, Alert, TextInput, TouchableOpacity
} from "react-native";
import * as React from "react";
import firebase from "firebase";
import {useEffect, useState} from "react";
import GlobalStyles from "../../globalStyling/GlobalStyles";

function CreateSalon({ navigation, route}) {

    // Her oprettes et tomt objekt til initialState
    const initialState = {
        name: '',
        address: '',
        type: '',
        priceRange: 0
    }

    // Instantiering af state-variabler til oprettelse af en ny salon
    const [newSalon,setNewSalon] = useState(initialState);

    // Metode som sætte nye saloners attributter
    const changeTextInput = (name,event) => {
        setNewSalon({...newSalon, [name]: event})
    }

    // Metode som gemmer den komplette nye salon
    // Den tjekker først om alle felter er udfyldt og hvis gjort korrekt, så pusher den til databasen.
    const handleSave = () => {
        const { name, address, type, priceRange} = newSalon;

        if(name.length === 0 || address.length === 0 || type.length === 0){
            return Alert.alert('Udfyld venligst alle felter.')
        }

        try {
            firebase
                .database()
                .ref('/BeautyMMJR/')
                .push({name, address, type, priceRange});
            Alert.alert('Saved');
            setNewSalon(initialState)
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.text}>OPRET SALON</Text>
                <View style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column'}}>
                </View>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newSalon[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                <TouchableOpacity style={GlobalStyles.buttonContainer} onPress={() => handleSave()}>
                    <Text style={GlobalStyles.buttonText}>Opret salon</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default CreateSalon


//Lokal styling til brug i CreateSalon
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});