import {StyleSheet} from "react-native";

const GlobalStyles = StyleSheet.create({
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
    salonName:{
        fontSize:18,
        marginLeft: 30,
        flex:1,
        alignSelf:'center',
        color:"#D22D2D",
        fontWeight:'bold'
    },

    address: {
        fontSize:14,
        flex:1,
        alignSelf:'center',
        color:"#8F1E1E"
    },
    buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#D22D2D"
    },
    buttonText:{
        fontSize:14,
        color: "#FFFFFF",
        fontWeight: "600"
    },
});

export default GlobalStyles