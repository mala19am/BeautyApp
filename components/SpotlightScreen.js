import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Image} from "react-native";
import * as React from "react";
import GlobalStyles from "../globalStyling/GlobalStyles";

// Returnerer hardcoded tekst om 'Ugens spotlight'
// Salonen som er 'Ugens spotlight er også hardcoded, og man er derfor i stand til at navigerer til SalonDetails.
// Til sidst dannes en knap som linker til salonen.
const Spotlight = ({navigation}) => {
    const salon =  [
        "-MqzoUo-UyBNIBFJIY1w",
        {
            "address": "Kongensgade 16",
            "name": "Haircut4you",
            "priceRange": "2",
            "type": "Frisør",
        },
    ]


    const goToSpotlightSalon = id => {


        navigation.navigate('SalonDetails', { salon });
    };

    return (
        <ScrollView>
            <View style={GlobalStyles.container}>
                <View style={GlobalStyles.header}>
                    <Text style={GlobalStyles.headerTitle}>
                        Ugens Spotlight
                    </Text>
                </View>

                <View style={GlobalStyles.postContent}>
                    <Text style={GlobalStyles.postTitle}>
                        Haircut4you
                    </Text>

                    <Text style={GlobalStyles.postDescription}>
                        Denne uges spotlight er Haircut4you. Haircut4you har med deres gode priser og mange års erfaring
                        et rigtig godt tilbud til dig. Hos Haircut4you kan du få klippet dit hår til perfektion og få farvet det
                        i alle regnbuens farver. Haircut4you tilbyder både dame- og herreklip. Så skynd dig at booke din tid
                        allerede i dag.
                    </Text>

                    <View style={GlobalStyles.bodyContent}>
                        <Image style={GlobalStyles.image} source={require('../image/hairdresser2.png')}/>

                        <Text style={GlobalStyles.name}>
                            Haircut4you
                        </Text>
                    </View>
                    <View style={GlobalStyles.bodyContent}>
                        <TouchableOpacity style={GlobalStyles.buttonContainer} onPress={() => goToSpotlightSalon()}>
                            <Text style={GlobalStyles.buttonText2}>Book tid</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}


export default Spotlight