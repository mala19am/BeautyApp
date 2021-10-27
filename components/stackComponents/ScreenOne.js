import {Button, StyleSheet, Text, View,
        SafeAreaView, ScrollView, Alert, TextInput} from "react-native";
import * as React from "react";
import firebase from "firebase";
import {useEffect, useState} from "react";

function ScreenOne({ navigation, route}) {

    const initialState = {
        name: '',
        address: '',
        type: ''
    }

    const [newSalon,setNewSalon] = useState(initialState);

    const changeTextInput = (name,event) => {
        setNewSalon({...newSalon, [name]: event})
    }

    const handleSave = () => {
        const { name, address, type} = newSalon;

        if(name.length === 0 || address.length === 0 || type.length === 0){
            return Alert.alert('Udfyld venligst alle felter.')
        }

        try {
            firebase
                .database()
                .ref('/BeautyMMJR/')
                .push({name, address, type});
            Alert.alert('Saved');
            setNewSalon(initialState)
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.text}>Add salon</Text>
                <View style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column'}}>
                    <View style={{margin: '2%'}} >
                        <Button title="Go Back" onPress={() => navigation.goBack() } />
                    </View>
                    <View style={{margin: '2%'}} >
                        <Button title="Go To Screen Two" onPress={() => navigation.navigate('ScreenTwo')}  />
                    </View>
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
                <Button title={"Add salon"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}
//Eksport af Screen således den kan importeres- og bruges i andres komponenter
export default ScreenOne


//Lokal styling til brug i ScreenOne
const styles = StyleSheet.create({
    container: {
        borderColor: 'red',
        borderWidth: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
    },
});