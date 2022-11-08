import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React , {useState, useEffect} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import styles from '../styles';
import { AppStackParams } from '../types';
import Animated, {BounceInDown, FadeInDown, FadeInUp, Layout, PinwheelIn} from "react-native-reanimated";
import { useTheme } from 'react-native-paper';
type Props = {
    item : {
      name : string,
      url : string,
      index : number
    },
    index : number,
    navigation : NativeStackNavigationProp<AppStackParams, "Home">
}

const Card :React.FC<Props> = ({item, index, navigation})=> {
  const [colors , setColors] = useState<string[]>(["orange","darkslategrey","darkmagenta", "blue","green","purple","cadetblue","crimson", "darkblue"])
  const [randomIndex, setRandomIndex] = useState<number>(0);
  const theme = useTheme();
  
  //here select one random color from the array
  useEffect(() => {
    let randomIndex: number = Math.floor(Math.random() * colors.length);
    setRandomIndex(randomIndex);
  }, []);

  
  return (
    <Pressable testID='pokemon-card'  style = {{width : "42%", height : 180, marginHorizontal : "4%", marginVertical : "3%"}} onPress = { ():void  => navigation.navigate("Details", {name : item.name.charAt(0).toUpperCase() + item.name.slice(1), color : colors[randomIndex], index : index , imgUrl : `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${("000" + JSON.stringify(index)).slice(-3)}.png`})}>
      
      <Animated.View 
        style = {[styles.CardView, {borderColor : colors[randomIndex]}]}
        entering = {BounceInDown.delay(20)}
      >
        <View style = {[styles.CardImgView,{backgroundColor : theme.backgroundColor.first}]}>
          <Image 
            source={{
              uri : `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${("000" + JSON.stringify(item.index)).slice(-3)}.png`
            }}
            style = {{width : "90%", height : "90%"}}
          />
        </View>
        
        <View style = {[styles.CardImgName, {backgroundColor : colors[randomIndex]}]}>
          <Text style = {[ {color : "white", fontSize : 17}, styles.fontRegular]} >{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
        </View>
      </Animated.View>

    </Pressable>
  )
}


export default Card;
