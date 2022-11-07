import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  ToastAndroid,
  TextInput,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParams} from '../../types';
import {RouteProp} from '@react-navigation/native';
import Card from '../../components/Card';
import styles from '../../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/store';
import {fetchListOfPokemons,fetchNextListOfPokemons} from '../../redux/pokemonSlice';
import {PokemonList} from '../../redux/pokemonSlice';

export type Props = {
  navigation: NativeStackNavigationProp<AppStackParams, 'Home'>;
  route: RouteProp<AppStackParams, 'Home'>;
  testing?: boolean;
};

const HomeScreen: React.FC<Props> = ({navigation, route, testing}) => {
  const [searchShow, setSearchShow] = useState<boolean>(testing || false);
  const fullData = useSelector((state: RootState) => state.pokemon.pokemonList);
  const nextApi = useSelector((state:RootState) => state.pokemon.nextPokemonApi);
  const nextLoading = useSelector((state:RootState) => state.pokemon.nextLoading);
  const [data, setData] = useState<PokemonList>();
  const [searchText, setSearchText] = useState<string>('');
  const [debounceTimeout, setDebounceTimeout] =
    useState<NodeJS.Timeout | null>();
  const dispatch = useDispatch();

  //fetch the 20 pokemon details
  useEffect(() => {
    dispatch(fetchListOfPokemons());
  }, []);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    if (searchText == '') {
      setData(fullData);
    } else {
      let newTimer = setTimeout(debounceSearch, 1000);
      setDebounceTimeout(newTimer);
    }
  }, [fullData, searchText]);

  function debounceSearch() {
    let newSearchData = fullData.filter(obj =>
      obj.name.includes(searchText.toLowerCase()),
    );
    setData(newSearchData);
  }

  //on logout, remove the loggedUser from asyncStorage.
  async function LogoutTheUser(): Promise<void> {
    try {
      if (!testing) {
        await AsyncStorage.removeItem('@loggedUser');
      }
      navigation.navigate('Open');
    } catch (error) {
      ToastAndroid.showWithGravity(
        'Error while Logging Out!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  }

  return (
    <View>
      <View style={styles.HomeHeaderHead}>
        <View style={styles.HomeHeader}>
          <Text style={[{color: 'black', fontSize: 35}, styles.fontBold]}>
            Pokemon
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {!searchShow && (
              <Icon
                name="search"
                size={35}
                color="black"
                onPress={() => setSearchShow(!searchShow)}
              />
            )}
            <Icon
              style={{marginLeft: 15}}
              name="logout"
              size={35}
              color="black"
              testID="log-out"
              onPress={LogoutTheUser}
            />
          </View>
        </View>

        {searchShow && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingHorizontal: 6,
            }}>
            <TextInput
              testID="search-box"
              style={{
                height: 40,
                flex: 10,
                borderRadius: 6,
                backgroundColor: '#DADADA',
                marginVertical: 5,
                paddingHorizontal: 5,
              }}
              placeholder="search"
              onChangeText={setSearchText}
              value={searchText}
              autoFocus = {true}
            />
            <Icon
              style={{marginLeft: 5, flex: 1}}
              name="close"
              size={27}
              color="black"
              onPress={() => {
                setSearchText('');
                setSearchShow(!searchShow);
              }}
            />
          </View>
        )}
      </View>

      <FlatList
        testID="list-of-items"
        data={data}
        numColumns={2}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        onEndReached = {() =>   dispatch(fetchNextListOfPokemons(nextApi))}
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center', marginTop: 200, fontSize: 20}}>
            Oops! No Pokemons Found 😔
          </Text>
        )}
        renderItem={({item, index}) => (
          <Card item={item} index={item.index} navigation={navigation} />
        )}
        style={{marginHorizontal: 20}}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={(): any => {
          return (
            <View testID="flatlist-header" style={{marginVertical: 15}}>
              <Text style={[{fontSize: 25, color: 'dimgrey'}, styles.fontBold]}>
                Hello {testing ? 'testing' : route.params.name}!
              </Text>
              <Text style={[{color: 'dimgrey'}, styles.fontRegular]}>
                Explore our vast collection of Pokemons
              </Text>
            </View>
          );
        }}
        ListFooterComponent={(): any => <View style={{height: 100}}>{nextLoading ? <ActivityIndicator size={"large"}/> : <></>}</View>}
      />
    </View>
  );
};

export default HomeScreen;
