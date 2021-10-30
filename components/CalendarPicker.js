import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default class CalenderPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
        }
        this.state = {isHidden: false};
        this.onPress = this.onPress.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }

    onPress() {
        this.setState({isHidden: !this.state.isHidden})
    }

    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={styles.container}>

                {this.state.isHidden ? <CalenderPicker/> : null}
                <Button title={this.state.isHidden ? "SHOW" : "HIDE"} onPress={this.onPress} />

                <CalendarPicker
                    onDateChange={this.onDateChange}
                />
                <View>
                    <Text>VALGTE DATO:{ startDate }</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 100,
    },
});