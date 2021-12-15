import {StyleSheet, Text, View, FlatList, TouchableOpacity,
        TouchableHighlight, Button, Image, Dimensions, Alert, ScrollView} from "react-native";
import * as React from "react";
import {SALONTYPES} from "../const";

/*
* Metode til at navigere på baggrund af de argumenter, som der sendes med i metode
* Metodens logik udnytter den prædefinerede metode, 'navigate', som navigere ind til det den komponent,
* der hænger sammen med det overførte rutenavn
 */
const navController = (navigation, route) =>{
    navigation.navigate(route)
}

//HomeScreen komponenten laver en flatlist som indeholder de 5 typer saloner, som hentes fra SALONTYPES.
function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.contentList}
                columnWrapperStyle={styles.listContainer}
                data={SALONTYPES}
                keyExtractor= {(item) => {
                    return item.id;
                }}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={styles.card} onPress={() => navController(navigation, item.key)}>
                            <Image style={styles.image} source={item.image}/>
                            <View style={styles.cardContent}>
                                <Text style={styles.name}>{item.key}</Text>
                            </View>
                        </TouchableOpacity>
                    )}}/>
        </View>
    );
}

export default HomeScreen

//Lokal styling til brug i HomeScreen
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20
    },
    contentList:{
        flex:1,
    },
    cardContent: {
        marginLeft:20,
        marginTop:10
    },
    image:{
        width:90,
        height:90,
        borderRadius:45,
        borderWidth:2,
        borderColor:"#ebf0f7"
    },

    card:{
        marginLeft: 20,
        marginRight: 20,
        marginTop:20,
        backgroundColor:"white",
        padding: 10,
        flexDirection:'row',
        borderRadius:30,
    },

    name:{
        fontSize:24,
        flex:1,
        alignSelf:'center',
        color:"#D22D2D",
        fontWeight:'bold'
    },
    followButton: {
        marginTop:10,
        height:35,
        width:100,
        padding:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "white",
        borderWidth:1,
        borderColor:"#dcdcdc",
    },
    followButtonText:{
        color: "#dcdcdc",
        fontSize:12,
    },
});
