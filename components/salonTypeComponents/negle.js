import {StyleSheet, Text, View, FlatList, TouchableOpacity} from "react-native";
import * as React from "react";
import firebase from "firebase";
import {useEffect, useState} from "react";
import GlobalStyles from "../../globalStyling/GlobalStyles"
import { Rating } from 'react-native-ratings'

const dollarSign = require ('../../image/dollar-symbol.png')

//HomeScreen komponenten tager en prop med og printer indholdet af denne i en <Text/>
const Negle = ({navigation}) => {
    const [salons,setSalons] = useState()

    useEffect(() => {
        if(!salons) {
            firebase
                .database()
                .ref('/BeautyMMJR')
                .orderByChild("type").equalTo("Negle")
                .on('value', snapshot => {
                    setSalons(snapshot.val())
                });
        }
    },[]);

    if (!salons) {
        return <Text>Intet at vise...</Text>
    }

    const handleSelectSalon = id => {
        /*Her søger vi direkte i vores array af biler og finder bil objektet som matcher idet vi har tilsendt*/
        const salon = Object.entries(salons).find( salon => salon[0] === id /*id*/)
        navigation.navigate('SalonDetails', { salon });
    };

    const salonArray = Object.values(salons);
    const salonKeys = Object.keys(salons);

    function salonTypeSelector(type) {
        let data = [];
        for(let i = 0, l = salonArray.length; i < l; i++){

            if(salonArray[i].type === type){
                data.push(salonArray[i]);
            }
        }
        console.log(data)
        return data;
    }

    return (
        <FlatList
            data={salonArray}
            keyExtractor={(item, index) => salonKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <View>
                        <TouchableOpacity style={GlobalStyles.card} onPress={() => handleSelectSalon(salonKeys[index])}>
                            <Text style={GlobalStyles.name}>{item.name}</Text>
                            <Text style={GlobalStyles.address}>Adresse: {item.address}</Text>
                            <Rating
                                type='custom'
                                ratingImage={ dollarSign }
                                ratingCount={3}
                                imageSize={30}
                                readonly={true}
                            />
                        </TouchableOpacity>
                    </View>
                )
            }}
        />
    );
}

export default Negle

//Lokal styling til brug i HomeScreen
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