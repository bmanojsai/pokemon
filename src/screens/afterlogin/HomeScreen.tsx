
import React , {useEffect, useState}from 'react'
import {View, Text, Pressable, FlatList, Image, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParams } from '../../types';
import { RouteProp } from '@react-navigation/native';
import axios, { AxiosResponse } from 'axios';
import Card from '../../components/Card';
import styles from '../../styles';
import Icon  from 'react-native-vector-icons/MaterialIcons';

export type Props = {
    navigation : NativeStackNavigationProp<AppStackParams, "Home">
    route : RouteProp<AppStackParams, "Home">
}


const HomeScreen : React.FC<Props> =  ({navigation,route}) => {
    const [data, setData] = useState<any>();


    //fetch the 20 pokemon details
    useEffect(() => {

        (async function():Promise<void>{
            await axios.get("https://pokeapi.co/api/v2/pokemon/")
                            .then( (response : AxiosResponse<any,any>): void => setData(response.data.results) )
                            .catch( (error : any): void => console.log(error) );
        })()

    } , []);

    //on logout, remove the loggedUser from asyncStorage.
    async function LogoutTheUser(): Promise<void> {
        try{
            await AsyncStorage.removeItem("@loggedUser");
            navigation.navigate("Open");
        }catch(error){
            ToastAndroid.showWithGravity("Error while Logging Out!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
        
    }

    return (
        <View>
            <View style = {styles.HomeHeader} >
               <Text style = {{color : "black", fontSize : 35}}>Pokemon</Text>
               <Icon name='logout' size={35} color = "black" onPress={LogoutTheUser} />
            </View>
            
            <FlatList 
                data={data}
                numColumns = {2}
                renderItem = { ({item, index}) => <Card item = {item} index = {index} navigation= {navigation} /> }
                style = {{marginHorizontal : 20}}
                showsVerticalScrollIndicator = {false}
                ListHeaderComponent = { () : any  => {
                    return (
                        <View style = {{marginVertical : 15}}>
                            <Text style = {{fontSize : 25}}>Hello {route.params.name}!</Text>
                            <Text>Explore our vast collection of Pokemons</Text>
                        </View>
                    );
                }}
                ListFooterComponent = {(): any => <View style = {{height : 100}} ></View>}
            />
        </View>
  )
}

export default HomeScreen;