
import React , {useEffect, useState}from 'react'
import {View, Text, Pressable, FlatList, Image, ToastAndroid, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParams } from '../../types';
import { RouteProp } from '@react-navigation/native';
import axios, { AxiosResponse } from 'axios';
import Card from '../../components/Card';
import styles from '../../styles';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { getListOfPokemons } from '../../redux/pokemonSlice';
import { RootState } from '../../redux/store';
import { fetchListOfPokemons } from '../../redux/pokemonSlice';
//import SearchBar from '../../components/SearchBar';
import { PokemonList } from '../../redux/pokemonSlice';

export type Props = {
    navigation : NativeStackNavigationProp<AppStackParams, "Home">
    route : RouteProp<AppStackParams, "Home">
    testing ?: boolean
}


const HomeScreen : React.FC<Props> =  ({navigation,route,testing}) => {
    const[searchShow, setSearchShow] = useState<boolean>( testing || false);
    const fullData = useSelector((state : RootState) => state.pokemon.pokemonList);
    const [data, setData] = useState<PokemonList>();
    const [searchText, setSearchText] = useState<string>("");
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>()
    const dispatch = useDispatch();

    //fetch the 20 pokemon details
    useEffect(() => {
        dispatch( fetchListOfPokemons() );
    } , []);

    useEffect(() => {
        //console.log("changed!!!")
        if(debounceTimeout){
            clearTimeout(debounceTimeout)
            //setDebounceTimeout(null);
        }
        if(searchText == ""){
            //console.log("This is called")
            setData(fullData);
        }else{
            //console.log(searchText);
            let newTimer = setTimeout(debounceSearch,1000);
            setDebounceTimeout(newTimer)
            
        }
    },[fullData, searchText]);


    function debounceSearch(){
        let newSearchData = fullData.filter((obj) => obj.name.includes(searchText));
        //console.log("888888888888888888",newSearchData, "***********************",fullData);
        setData(newSearchData);
    }


    //on logout, remove the loggedUser from asyncStorage.
    async function LogoutTheUser(): Promise<void> {
        try{
            if(!testing){
                await AsyncStorage.removeItem("@loggedUser");
            }
            navigation.navigate("Open");
        }catch(error){
            ToastAndroid.showWithGravity("Error while Logging Out!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
        
    }

    return (
        <View>
            <View style = {styles.HomeHeaderHead} >
                <View style = {styles.HomeHeader}>
                    <Text style = {[{color : "black", fontSize : 35}, styles.fontBold]}>Pokemon</Text>
                    <View style = {{display : "flex", flexDirection: "row", justifyContent : "center"}} >
                        <Icon name='search' size={35} color = "black" onPress={() => setSearchShow(!searchShow)} />
                        <Icon style= {{marginLeft :15}} name='logout' size={35} color = "black" testID='log-out' onPress={LogoutTheUser} />
                    </View>
                </View>

                {
                    searchShow && (<TextInput 
                        testID='search-box'
                        style = {{height : 40, width : "90%", borderRadius : 6, backgroundColor : "#DADADA", marginVertical :5, paddingHorizontal : 5}} 
                        placeholder = "search"
                        onChangeText={setSearchText}  
                        value = {searchText}
                    />)
                }
                
               
               
            </View>
            
            <FlatList 
                testID='list-of-items'
                data={data}
                numColumns = {2}
                removeClippedSubviews = {true}
                maxToRenderPerBatch = {10}
                
                ListEmptyComponent = {() => <Text style = {{ textAlign : "center", marginTop : 200, fontSize : 20}}>Oops! No Pokemons Found 😔</Text>}
                renderItem = { ({item, index}) => <Card item = {item} index = {index} navigation= {navigation} /> }
                style = {{marginHorizontal : 20}}
                showsVerticalScrollIndicator = {false}
                ListHeaderComponent = { () : any  => {
                    return (
                        <View testID='flatlist-header' style = {{marginVertical : 15}}>
                            <Text style = {[ {fontSize : 25, color : "dimgrey"}, styles.fontBold ]}>Hello { testing ? "testing" : route.params.name}!</Text>
                            <Text style = {[ {color : "dimgrey"} , styles.fontRegular]}>Explore our vast collection of Pokemons</Text>
                        </View>
                    );
                }}
                ListFooterComponent = {(): any => <View style = {{height : 100}} ></View>}
            />
        </View>
  )
}

export default HomeScreen;