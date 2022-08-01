import React, {useEffect} from "react";
import {View, Text, Image, Pressable, ToastAndroid} from "react-native";
import styles from "../../styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParams, UserDetails } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Props{
    navigation : NativeStackNavigationProp<AppStackParams , "Open">
}

const OpenScreen : React.FC<Props> = ({navigation}) => {

    //This useEffect() will check if any user already logged in or not.
    // if logged in -> redirects to Home Page with user data
    //else -> do nothing(stay in Open page itself)
    useEffect(() => {
        
        (async function() : Promise<void>{
            try{
                let loggedUserData : string | null = await AsyncStorage.getItem("@loggedUser");
                if(loggedUserData){
                    let users : string | null = await AsyncStorage.getItem("@users");
                    if(users == null || users == "[]"){
                        await AsyncStorage.removeItem("@loggedUser");
                    }else{
                        let usersJSON : UserDetails[] | []  = JSON.parse(users);
                        let particularUser :  UserDetails[] | [] =  usersJSON.filter((user) => user.email == loggedUserData);
                        if( particularUser == [] ){
                            await AsyncStorage.removeItem("@loggedUser");
                        }else{
                            navigation.navigate("Home", particularUser[0]);
                        }
                    }
                }
            }catch(error){
                console.log(error);
            }
        })()

    } , []);


    return (
        <View style = {styles.flexFullScreen}>

            <View style = {styles.OpenTopEmptyView}></View>
            
            <View style = {styles.OpenImgView}>
                <Image  source={require("../../assets/pokemon-logo.png")} style = {{width : 300, height : 150}} />
                <Image 
                    source={{uri : "https://www.seekpng.com/png/detail/237-2378177_pokemon-kanto-starters-and-pikachu.png"}}
                    style = {styles.Img}
                />
            </View>
            
            <View style = {styles.OpenBottomView}>
                <View>
                    <Pressable onPress={() => navigation.navigate("SignUp" )} >
                        <View style = {[ styles.OpenSignupButton ,  {backgroundColor : "#3b810c"}, styles.ButtonShadow ]}><Text style = {[ styles.OpenText ,styles.fontRegular, { color : "white"  } ]}>Sign Up</Text></View>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate("Login")} >
                        <View style = {styles.OpenSignupButton}><Text style = {[ styles.OpenText ,styles.fontRegular, { color : "#3b810c" } ]}>Login</Text></View>
                    </Pressable>
                </View>
                
            </View>
        </View>
    );
}

export default OpenScreen;