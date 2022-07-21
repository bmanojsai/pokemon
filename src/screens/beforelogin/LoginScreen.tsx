import React , {useState} from "react";
import {View, Text, Image, TextInput, Pressable, ToastAndroid} from "react-native";
import styles from "../../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParams, UserDetails } from "../../types";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome5";
type Props = {
    navigation : NativeStackNavigationProp<AppStackParams, "Login">
}


const LoginScreen : React.FC<Props> = ({navigation}) => {
    const [inputEmail, setInputEmail] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");
    const [passwordMask, setPasswordMask] = useState<boolean>(true);

    //get particular user by input email id. check if password is correct or not.
    //if correct -> navigate to Home Page
    //else -> toast an error.
    const authenticateUser = async () : Promise<void> => {
        let users : string | null = await AsyncStorage.getItem('@users');
        if(users == null || users == "[]"){
            ToastAndroid.showWithGravity("User not found!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }else{
            let usersJSON : UserDetails[] | []  = JSON.parse(users);
            let particularUser :  UserDetails[] | [] =  usersJSON.filter((user) => user.email == inputEmail);
            if( particularUser.length === 0 ){
                ToastAndroid.showWithGravity("Invalid Email or Password !", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            }else{
                if(particularUser[0].password === inputPassword){
                    ToastAndroid.showWithGravity("User Logged In successfully!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                    await AsyncStorage.setItem("@loggedUser", inputEmail);
                    // navigation.navigate("Home",particularUser[0]);
                    navigation.reset(  {index : 0, routes : [{name : "Home", params : particularUser[0]}]})
                }else{
                    ToastAndroid.showWithGravity("Invalid Email or Password !", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                }
            }
        }      
    }



    return (
        <View style = {styles.flexFullScreen}>
            
            <View style = {styles.SignUpTopView}>
                <Image  
                    source={{uri : "https://1000logos.net/wp-content/uploads/2017/05/Pokemon-Logo-768x480.png"}}
                    style = {[styles.Img]}
                />
            </View>
            
            <View style = {styles.SignUpBottomView}>
                <View style = {styles.InputField}>
                    <View >
                        <Icon name = "email" size={23} color = "black"/>
                    </View>
                    <TextInput 
                        style = {styles.TextInputField} 
                        placeholder = "email" 
                        onChangeText={setInputEmail}    
                    />
                </View>
                
                <View style = {styles.InputField}>
                    <View >
                        <Icon2 name = "key" size={21} color = "black"/>
                    </View>
                    <TextInput 
                        style = {styles.TextInputField} 
                        placeholder = "password" 
                        onChangeText={setInputPassword}  
                        secureTextEntry = {passwordMask}
                    />
                    <View >
                        <Icon1 style = {{marginLeft : 5}} name = { passwordMask ? "eye" : "eye-slash"} size={23} color = "black" onPress={() => setPasswordMask(!passwordMask)} />
                    </View>
                </View>

                

                <Pressable onPress = {authenticateUser} style = {[ styles.OpenSignupButton , {backgroundColor : "#3b810c", marginTop : 60}, styles.ButtonShadow ]}>
                    <Text style = {[ styles.OpenText , { color : "white"  } ]}>Log In</Text>
                </Pressable>

                <View style = {styles.DontLink}><Text>Don't have an account? </Text><Pressable onPress={():void => navigation.navigate("SignUp")}><Text style = {{color : "blue"}}>create here</Text></Pressable></View>
                
            </View>

            <View style = {styles.BackButton}><Icon name="arrow-back" color={"black"} size = {30} onPress ={ () => navigation.goBack()} /></View>
        
        </View>
    );
}

export default LoginScreen;