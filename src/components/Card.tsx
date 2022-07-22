import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React , {useState, useEffect} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import styles from '../styles';
import { AppStackParams } from '../types';

type Props = {
    item : {
      name : string,
      url : string
    },
    index : number,
    navigation : NativeStackNavigationProp<AppStackParams, "Home">
}

const Card :React.FC<Props> = ({item, index, navigation})=> {
  const [colors , setColors] = useState<string[]>(["orange","darkslategrey","darkmagenta", "blue","green","purple","cadetblue","crimson", "darkblue"])
  const [randomIndex, setRandomIndex] = useState<number>(0);
  
  
  //here select one random color from the array
  useEffect(() => {
    let randomIndex: number = Math.floor(Math.random() * colors.length);
    setRandomIndex(randomIndex);
  }, []);

  
  return (
    <Pressable style = {[styles.CardView, {borderColor : colors[randomIndex]}]} onPress = { ():void  => navigation.navigate("Details", {name : item.name.charAt(0).toUpperCase() + item.name.slice(1), color : colors[randomIndex], index : index+1 , imgUrl : `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${("000" + JSON.stringify(index+1)).slice(-3)}.png`})}>
      <View style = {styles.CardImgView}>
        <Image 
          source={{
            uri : `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${("000" + JSON.stringify(index+1)).slice(-3)}.png`
          }}
          style = {{width : "90%", height : "90%"}}
        />
      </View>
      <View style = {[styles.CardImgName, {backgroundColor : colors[randomIndex]}]}>
        <Text style = {{color : "white", fontSize : 17}} >{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
      </View>
     
    </Pressable>
  )
}


export default Card;
