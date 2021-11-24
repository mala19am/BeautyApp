import {StyleSheet} from "react-native";

const GlobalStyles = StyleSheet.create({
    container:{
        flex:1
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
        flex: 1,
        alignSelf: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop:15,
        backgroundColor:"white",
        padding: 10,
        borderRadius:30,
        width: '90%',
        height: '60%'
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
        marginLeft: 10,
        marginTop: 15,
        flex:1,
        color:"#D22D2D",
        fontWeight:'bold'
    },
    address: {
        fontSize: 14,
        flex:1,
        color:"#8F1E1E",
        marginTop: 18,
        marginLeft: 10,
    },
    buttonContainer: {
        marginTop:5,
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
        fontSize:13,
        color: "#FFFFFF",
        fontWeight: "600"
    },
    row: {
        alignItems: 'center',
        marginLeft:0,
        marginTop: 20,
        marginBottom: 20,
        marginRight:0,
        backgroundColor:"#D22D2D",
        padding: 10,
        borderRadius:0,
        justifyContent: 'space-between',
    },
    textSalons: {
        color: "white",
        fontWeight: "bold",
        marginTop: 5,
        textAlign: "center",
        fontSize: 20,
    },
    containerCreateSalon: {
        paddingTop:25,
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        height:'100%'
    },
    textCreateSalon: {
        fontSize: 25,
        fontWeight: "bold",
    },
    buttonCreateSalon: {
        marginTop:5,
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#D22D2D"
    },
    buttonContainerDelete: {
        marginLeft: 10,
        marginTop:5,
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom:5,
        width:100,
        borderRadius:30,
        backgroundColor: "#D22D2D"
    },
});


export default GlobalStyles