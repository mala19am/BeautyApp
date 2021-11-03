import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    SafeAreaView,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default class CalenderPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
        }
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }

    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <SafeAreaView style={styles.container}>

                <CalendarPicker
                    onDateChange={this.onDateChange}
                />
                <View>
                    <Text>VALGTE DATO:{ startDate }</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});