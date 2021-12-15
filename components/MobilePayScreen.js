import {Image} from "react-native";
import * as React from "react";


// Komponentet viser et simpelt screenshot af en mobilepay transaktion for at demonstrerer betaling i systemet.
const MobilePay = ({navigation}) => {
    return (
        <Image source={require("../image/MobilePay_SendSide.jpg")} style={{width: null, height: null, flex: 1, resizeMode: 'contain'}}/>
    );

}

export default MobilePay