import * as React from 'react';
import {View, Text, Platform, FlatList, StyleSheet, Button, Alert, TouchableOpacity, Image} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";
import {SALONTYPES} from "../const";

const SalonDetails = ({route,navigation}) => {
    const [salons,setSalons] = useState()

    useEffect(() => {
        if(!salons) {
            firebase
                .database()
                .ref('/BeautyMMJR')
                .orderByChild("type").equalTo()
                .on('value', snapshot => {
                    setSalons(snapshot.val())
                });
        }
    },[]);



    if (!salon) {
        return <Text>No data</Text>;
    }

    const navController = (navigation, route) =>{
        navigation.navigate(route)
    }

    //all content
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.contentList}
                columnWrapperStyle={styles.listContainer}
                data={salon}
                keyExtractor= {(item) => {
                    return item.id;
                }}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={styles.card} onPress={() => navController(navigation, 'SalonDetails')}>
                            <Image style={styles.image} source={item.image}/>
                            <View style={styles.cardContent}>
                                <Text style={styles.name}>{item.key}</Text>
                            </View>
                        </TouchableOpacity>
                    )}}/>
        </View>
    );
}


export default SalonDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});