import { createSlice } from "@reduxjs/toolkit";
import { BasicDetails } from "../screens/afterlogin/DetailsScreen";

export type PokemonList = { name : string, url : string }[]

const initialState:{
    pokemonList : PokemonList,
    pokemonDetails : BasicDetails
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
    }
}

let pokemonSlice = createSlice({
    name : "pokemon",
    initialState,
    reducers : {
        fetchListOfPokemons : () => {

        },
        fetchPokemonDetails : (state,action) => {

        },

        getListOfPokemons : (state, action) => {
            state.pokemonList = action.payload
        },

        getPokemonDetails : (state, action) => {
            state.pokemonDetails = action.payload
        }
    }
})


export const { fetchListOfPokemons,fetchPokemonDetails, getListOfPokemons , getPokemonDetails } = pokemonSlice.actions;
export default pokemonSlice.reducer;