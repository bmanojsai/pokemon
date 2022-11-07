import { createSlice } from "@reduxjs/toolkit";
import { BasicDetails } from "../screens/afterlogin/DetailsScreen";
import reactotron from 'reactotron-react-native';

export type PokemonList = { name : string, url : string, index : number }[]

const initialState:{
    pokemonList : PokemonList,
    pokemonDetails : BasicDetails,
    nextPokemonApi : String,
    nextLoading: boolean
} =  {
    pokemonList : [],
    pokemonDetails : {
        height : 0, 
        weight : 0, 
        experience : 0,
        abilities : ["loading", "loading"],
        moves : ["loading", "loading"],
        stats : [0,0,0,0,0,0],
        progressStats : [0,0,0,0,0,0]
    },
    nextPokemonApi : "",
    nextLoading : false
}

let pokemonSlice = createSlice({
    name : "pokemon",
    initialState,
    reducers : {
        fetchListOfPokemons : () => {

        },
        fetchPokemonDetails : (state,action) => {

        },
        fetchNextListOfPokemons : (state,action) => {
            state.nextLoading = true;
        },
        getListOfPokemons : (state, action) => {
            state.pokemonList.push(...action.payload);
            state.nextLoading = false;
        },
        getPokemonDetails : (state, action) => {
            state.pokemonDetails = action.payload;
        },
        getNextPokemonApi : (state,action) =>{
            state.nextPokemonApi = action.payload;
        }
    }
})


export const { fetchListOfPokemons,fetchPokemonDetails,fetchNextListOfPokemons, getListOfPokemons , getPokemonDetails,getNextPokemonApi } = pokemonSlice.actions;
export default pokemonSlice.reducer;