import { takeLatest, call, put, all, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import {getListOfPokemons, getPokemonDetails} from "../redux/pokemonSlice";
import {Ability, Moves, BasicDetails} from "../screens/afterlogin/DetailsScreen";


function* pokemonWatcher(){
    yield takeLatest("pokemon/fetchListOfPokemons", fetchPokemonList);
    yield takeLatest("pokemon/fetchPokemonDetails", fetchPokemonDetailsSaga)
}


function* fetchPokemonList(){
    try{
        let response : { [k : string] : any } = yield call( axios.get ,"https://pokeapi.co/api/v2/pokemon/" );
        let dataJSON : {name : string, url :string}[] = yield response.data.results;
        yield put(getListOfPokemons(dataJSON));
        //console.log("fetchListOfPokemons is called!");
        //console.log(dataJSON);
    }catch(error){
        console.log("Error while fetching list of pokemons",error)
    }
    
}


function* fetchPokemonDetailsSaga(action : any){
    try{
        let aboutData1 : { [k : string] : any } = yield call( axios.get ,`https://pokeapi.co/api/v2/pokemon/${action.payload}` );
        let aboutData :  { [k : string] : any } = yield aboutData1.data; 
        
        let abilityArray:string[] = yield aboutData.abilities.map( (obj : Ability) => obj.ability.name ) 
        let movesArray : string[] = yield aboutData.moves.map( (obj : Moves) => obj.move.name);
        let stats : number[] = yield aboutData.stats.map((obj : {base_stat : number}) => obj.base_stat);
        let pStats : number[] = yield stats.map((num : number) => num/100 );
        let fullDetails : BasicDetails = yield {
                height : aboutData.height, 
                weight : aboutData.weight, 
                experience : aboutData.base_experience,
                abilities : abilityArray,
                moves : movesArray,
                stats : stats,
                progressStats : pStats
            }
        yield put(getPokemonDetails(fullDetails));
        
    }catch(error){
        console.log(error)
    }

}

export default function* rootSaga(){
    yield all([
        pokemonWatcher(),
    ])
} 