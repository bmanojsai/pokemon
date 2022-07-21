import { StyleSheet } from "react-native";

const styles = StyleSheet.create({


    flexFullScreen : {
        flex : 1,
        backgroundColor : "#f6f6f6"
    },
    OpenTopEmptyView : {
        flex : 1.5,
        // backgroundColor : "yellow"
    },
    OpenImgView : {
        flex : 5,
        //backgroundColor : "blue",
        justifyContent : "center",
        alignItems : "center"
    },
    OpenBottomView : {
        flex : 3,
        // backgroundColor : "green",
        flexDirection : "row",
        justifyContent : "center",
        alignItems : 'center',
        marginTop : 50
    },
    Img : {
        width : "100%",
        height : "90%"
    },
    OpenSignupButton :{
        width : 180,
        height : 50,
        borderRadius : 30,
        display : "flex",
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        marginVertical : 5,
        
    },
    OpenText : {
        fontSize : 20
    },
    ButtonShadow : {
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity:  0.17,
        shadowRadius: 3.05,
        elevation: 7,
    },


    //below are signUp page css

    SignUpTopView : {
        
        height : 200,
        //backgroundColor  : "blue",
        padding : 40,
        paddingBottom : 0
    },
    SignUpBottomView : {
        flex : 1,
        // backgroundColor  : "yellow",
        alignItems : "center",
        //justifyContent : "flex-start"
        paddingTop : 40
    },


    //styles for Card.tsx

    CardView : {
        width : "40%",
        height : 180,
        marginHorizontal : "5%",
        marginVertical : "2%",
        borderWidth : 1,
        borderColor : "green",
        borderRadius : 10,
        display : "flex",
        flexDirection : "column",
        shadowColor : "black",
        elevation : 7
    },
    CardImgView : {
        flex : 3,
        //backgroundColor : 'yellow',
        borderTopRightRadius : 10,
        borderTopLeftRadius : 10,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "white"
    },
    CardImgName : {
        flex : 1,
        backgroundColor : "green",
        borderBottomRightRadius : 10,
        borderBottomLeftRadius : 10,
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
    },

    HomeHeader : {
        height : 70,
        backgroundColor : "white",
        shadowColor : "black",
        shadowRadius : 20,
        elevation : 30,
        display : "flex",
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        paddingHorizontal : 10
    },

    //detailsScreen css

    DetailsHeader  : {
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
        paddingHorizontal : 5,
        padding : 5,
        height : 50,
        //backgroundColor : "yellow"
    },
    DetailsTopView : {
        height : 300
        
    },
    DetailsImgView : {
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
    },
    DetailsBottomView : {
        flex : 2,
        backgroundColor : "white",
        margin : 5,
       borderRadius : 5
    },
    DetailView1 : {
        //flex : 1,
        height : 50,
        //backgroundColor : 'orange',
        justifyContent : "center",
        alignItems : "center"
    },
    DetailView2 :{
        // flex : 1.5,
        height : 100,
        //backgroundColor : 'green',
        flexDirection : "row",
        paddingVertical : 15
    },
    DetailView3 : {
        // flex : 1.1,
        height : 70,
        //backgroundColor : 'pink',
        paddingHorizontal : 10,
        flexDirection : "row",
        alignItems : "center",
    },
    DetailView4  :{
        // flex : 1.1,
        height : 70,
        //backgroundColor : 'yellow',
        paddingHorizontal : 10,
        flexDirection : "row",
        alignItems : "center",
    },
    DetailView5 : {
        // flex : 4,
        height : 300,
        //backgroundColor : 'red'
    },
    DV2mini : {
        flex : 1,
        justifyContent : "center",
        alignItems :"center"
    },
    FontSize  :{
        fontSize : 20
    },
    FillText : {
        marginHorizontal : 5,
        paddingHorizontal : 20,
        paddingVertical : 7,
        //backgroundColor : "blue",
        borderRadius : 15,
        color : "white"
    },


    //below are common css i think

    InputField : {
        width : "80%",
        height : 50,
        backgroundColor : "smokeWhite",
        opacity : 0.7,
        borderRadius : 10,
        marginVertical : 20,
        color : "black",
        fontSize : 20,
        paddingHorizontal : 8,
        borderWidth : 1,
        borderColor : "black",
        display : "flex",
        flexDirection: "row",
        alignItems : "center"
    },
    TextInputField : {
        flex : 1,
        //backgroundColor : "grey",
        fontSize : 20,
    },
    BackButton : {
        width : 40,
        height : 40,
        backgroundColor : "white",
        borderRadius : 20,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        position : "absolute",
        top : 20,
        left : 20,
        shadowColor : "black",
        elevation : 5
    },
    DontLink : {
        marginTop  :30,
        display : "flex",
        flexDirection : "row",

    }



});


export default styles;