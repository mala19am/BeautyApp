import {StyleSheet, Text, View, FlatList, TouchableOpacity} from "react-native";
import * as React from "react";
import firebase from "firebase";
import {useEffect, useState} from "react";
import GlobalStyles from "../../globalStyling/GlobalStyles"
import { Rating } from 'react-native-ratings'

// Henter billede til prisangivning
const dollarSign = require ('../../image/dollarSignFinal.png')

// En funktion som laver et tilfældigt nummer mellem 1 og 5.
// Skal bruges til rating
function getRandomNumber() {
    return Math.floor(Math.random()* 5) + 1;
}


const Negle = ({navigation}) => {
    const [salons,setSalons] = useState()

    // Henter alle saloner med 'Negle' som type.
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

    // Hvis der ikke er nogle saloner returnerer den en text.
    if (!salons) {
        return <Text>Intet at vise...</Text>
    }

    // Her søger vi direkte i vores array af saloner og finder salon objektet som matcher id'et vi har tilsendt
    // Id'et bliver sendt med som en parameter
    const handleSelectSalon = id => {
        const salon = Object.entries(salons).find( salon => salon[0] === id)
        navigation.navigate('SalonDetails', { salon });
    };

    // Opretter variabler udfra salons objekterne
    const salonArray = Object.values(salons);
    const salonKeys = Object.keys(salons);

    // Opretter en flatlist og viser de enkelte saloner
    return (
        <FlatList
            data={salonArray}
            keyExtractor={(item, index) => salonKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <View>
                        <TouchableOpacity style={GlobalStyles.cardSalons} onPress={() => handleSelectSalon(salonKeys[index])}>
                            <View style={{flexDirection: 'column', width: '65%'}}>
                                <Text style={GlobalStyles.name}>{item.name}</Text>
                                <Text style={GlobalStyles.address}>Adresse: {item.address}</Text>
                            </View>
                            <View style={{flexDirection:'column'}}>
                                <Rating
                                    style={(GlobalStyles.rating)}
                                    type='custom'
                                    ratingImage={ dollarSign }
                                    startingValue={ item.priceRange}
                                    ratingCount={3}
                                    imageSize={20}
                                    readonly={true}
                                    ratingColor= {'#378805'}
                                />
                                <Rating
                                    style={(GlobalStyles.dollarRating)}
                                    type='star'
                                    ratingCount={5}
                                    imageSize={20}
                                    readonly= { true }
                                    startingValue= { getRandomNumber() }
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }}
        />
    );
}

export default Negle