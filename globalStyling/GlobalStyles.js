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
        borderColor:"#ebf0f7",
    },
    cardSalons:{
        flex: 1,
        alignSelf: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop:15,
        backgroundColor:"white",
        padding: 10,
        borderRadius:30,
        width: '90%',
        height: '60%',
        flexDirection: "row",
    },
    cardBooking:{
        flex: 1,
        alignSelf: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop:15,
        backgroundColor:"white",
        padding: 10,
        borderRadius:30,
        width: '90%',
        height: '60%',
    },
    header:{
        padding:30,
        alignItems: 'center',
        backgroundColor: "#D22D2D",
    },
    headerTitle:{
        fontSize:30,
        color:"#FFFFFF",
        marginTop:10,
    },
    name:{
        fontSize:24,
        flex:1,
        marginLeft: 10,
        color:"#D22D2D",
        fontWeight:'bold',
    },
    salonName:{
        fontSize:18,
        marginLeft: 10,
        flex:1,
        color:"#D22D2D",
        fontWeight:'bold',
    },
    address: {
        fontSize: 14,
        flex:1,
        color:"#8F1E1E",
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
    },
    rating: {
        flex:1,
        marginTop: 10,

    },
    dollarRating: {
        flex:1,
        marginTop: 10,

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
    buttonContainer2: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 10,
        alignItems: 'center',
        marginBottom:20,
        width:150,
        borderRadius:30,
        backgroundColor: "#D22D2D",
    },
    mobilePayButton: {
        marginTop:5,
        height:45,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#FFFFFF"
    },
    buttonText:{
        fontSize:13,
        color: "#FFFFFF",
        fontWeight: "600"
    },
    buttonText2:{
        fontSize:14,
        color: "#FFFFFF",
        fontWeight: "600"
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:10,
        marginTop:5,
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height:'100%'
    },
    textCreateSalon: {
        marginBottom: 10,
        fontSize: 25,
        fontWeight: "bold",
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
    postContent: {
        flex: 1,
        padding:30,
    },
    postTitle:{
        fontSize:26,
        fontWeight:'600',
    },
    postDescription:{
        fontSize:16,
        marginTop:10,
    },
});


export default GlobalStyles