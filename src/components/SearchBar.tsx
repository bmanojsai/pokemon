import React from 'react'
import {TextInput} from 'react-native';
import styles from '../styles';

function SearchBar() {
  return (
    <TextInput 
        style = {{height : 40, width : "90%", borderRadius : 6, backgroundColor : "#DADADA", marginVertical :5, paddingHorizontal : 5}} 
        placeholder = "search"  
    />
  )
}



export default SearchBar;