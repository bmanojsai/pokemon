import {takeLatest, call, put, all, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import {getListOfPokemons, getPokemonDetails,getNextPokemonApi} from '../redux/pokemonSlice';
import {
  Ability,
  Moves,
  BasicDetails,
} from '../screens/afterlogin/DetailsScreen';
import reactotron from 'reactotron-react-native';

function* pokemonWatcher() {
  yield takeLatest('pokemon/fetchListOfPokemons', fetchPokemonList);
  yield takeLatest('pokemon/fetchPokemonDetails', fetchPokemonDetailsSaga);
  yield takeEvery('pokemon/fetchNextListOfPokemons',fextNextPokemonList);
}

function findIndexfromAPi(api : string) {
  let splitarray = api.split('/');
  return parseInt(splitarray[6]);
}

function* fetchPokemonList() {
  try {
    let response: {[k: string]: any} = yield call(
      axios.get,
      'https://pokeapi.co/api/v2/pokemon/',
    );
    let dataJSON: {name: string; url: string}[] = yield response.data.results;
    let newDataJSON :  {name: string; url: string; index : number}[] = yield dataJSON.map( (item : { name : string, url : string }) => { return {...item , index : findIndexfromAPi(item.url) }}  ) 
    yield put(getListOfPokemons(newDataJSON));
    let nextPokemonApi : string = yield response.data.next;
    yield put(getNextPokemonApi(nextPokemonApi));
  } catch (error) {
    console.log('Error while fetching list of pokemons', error);
  }
}

function* fetchPokemonDetailsSaga(action: any) {
  try {
    let aboutData1: {[k: string]: any} = yield call(
      axios.get,
      `https://pokeapi.co/api/v2/pokemon/${action.payload}`,
    );
    let aboutData: {[k: string]: any} = yield aboutData1.data;

    let abilityArray: string[] = yield aboutData.abilities.map(
      (obj: Ability) => obj.ability.name,
    );
    let movesArray: string[] = yield aboutData.moves.map(
      (obj: Moves) => obj.move.name,
    );
    let stats: number[] = yield aboutData.stats.map(
      (obj: {base_stat: number}) => obj.base_stat,
    );
    let maxStat: number = Math.max(...stats);
    let pStats: number[] = yield stats.map((num: number) => num / maxStat);
    let fullDetails: BasicDetails = yield {
      height: aboutData.height,
      weight: aboutData.weight,
      experience: aboutData.base_experience,
      abilities: abilityArray,
      moves: movesArray,
      stats: stats,
      progressStats: pStats,
    };
    yield put(getPokemonDetails(fullDetails));
  } catch (error) {
    console.log(error);
  }
}

function* fextNextPokemonList(action:any){
  try {
    let response: {[k: string]: any} = yield call(
      axios.get,
      action.payload,
    );
    let dataJSON: {name: string; url: string}[] = yield response.data.results;
    let newDataJSON :  {name: string; url: string; index : number}[] = yield dataJSON.map( (item : { name : string, url : string }) => { return {...item , index : findIndexfromAPi(item.url) }}  ) 
    yield put(getListOfPokemons(newDataJSON));
    let nextPokemonApi : string = yield response.data.next;
    yield put(getNextPokemonApi(nextPokemonApi));
  } catch (error) {
    console.log('Error while fetching list of pokemons', error);
  }
}

export default function* rootSaga() {
  yield all([pokemonWatcher()]);
}
