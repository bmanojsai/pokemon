import {RouteProp, ThemeProvider} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles';
import {AppStackParams} from '../../types';
import {BarChart, ProgressChart} from 'react-native-chart-kit';
import {useSelector, useDispatch} from 'react-redux';
import {fetchPokemonDetails, getPokemonDetails} from '../../redux/pokemonSlice';
import {RootState} from '../../redux/store';
import { useTheme } from 'react-native-paper';
type TextProps = {
  ability: string;
};

const DetailsText: React.FC<TextProps> = ({ability}) => {
  const [colors, setColors] = useState<string[]>([
    'orange',
    'darkslategrey',
    'darkmagenta',
    'blue',
    'green',
    'purple',
    'cadetblue',
    'crimson',
    'darkblue',
  ]);
  const [randomIndex, setRandomIndex] = useState<number>(0);

  //here select one random color from the array
  useEffect(() => {
    let randomIndex: number = Math.floor(Math.random() * colors.length);
    setRandomIndex(randomIndex);
  }, []);

  return (
    <Text style={[styles.FillText, {backgroundColor: colors[randomIndex]}]}>
      {ability}
    </Text>
  );
};

type Props = {
  navigation: NativeStackNavigationProp<AppStackParams, 'Details'>;
  route: RouteProp<AppStackParams, 'Details'>;
};

export type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type Moves = {
  move: {
    name: string;
    url: string;
  };
  version_group_details: any[];
};

export type BasicDetails = {
  height: number;
  weight: number;
  experience: number;
  abilities: string[];
  moves: string[];
  stats: number[];
  progressStats: number[];
};

const DetailsScreen: React.FC<Props> = ({navigation, route}) => {
  const basicDetails = useSelector(
    (state: RootState) => state.pokemon.pokemonDetails,
  );
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect((): void => {
    dispatch(fetchPokemonDetails(route.params.index));
  }, []);

  return (
    <View
      style={[styles.flexFullScreen, {backgroundColor: route.params.color}]}>
      <View
        style={[styles.DetailsTopView, {backgroundColor: route.params.color}]}>
        <View style={[styles.DetailsHeader, {justifyContent: 'space-between'}]}>
          <View style={styles.DetailsHeader}>
            <Icon
              name="arrow-back"
              color="white"
              size={35}
              onPress={() => navigation.goBack()}
            />
            <View>
              <Text
                style={[
                  {fontSize: 30, color: 'white', marginHorizontal: 10},
                  styles.fontBold,
                ]}>
                {route.params.name}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.DetailsImgView}>
          <Image
            source={{uri: route.params.imgUrl}}
            style={{height: 250, width: 250, overflow: 'visible'}}
          />
        </View>
      </View>
      <ScrollView style={[styles.DetailsBottomView,{backgroundColor : theme.backgroundColor.first}]}>
        <View style={styles.DetailView1}>
          <Text style={{color: route.params.color, fontSize: 20}}>About</Text>
        </View>

        <View style={styles.DetailView2}>
          <View style={[styles.DV2mini]}>
            <Text style={styles.FontSize}>{basicDetails?.height}'</Text>
            <Text style={{marginTop: 3}}>Height</Text>
          </View>
          <View
            style={[
              styles.DV2mini,
              {borderRightWidth: 2, borderLeftWidth: 2, borderColor: 'grey'},
            ]}>
            <Text style={styles.FontSize}>{basicDetails?.experience}</Text>
            <Text style={{marginTop: 3}}>Experiecnce</Text>
          </View>
          <View style={[styles.DV2mini]}>
            <Text style={styles.FontSize}>{basicDetails?.weight}kg</Text>
            <Text style={{marginTop: 3}}>weight</Text>
          </View>
        </View>

        <View style={styles.DetailView3}>
          <Text style={{color: route.params.color, fontSize: 17}}>
            Abilities :
          </Text>
          <FlatList
            data={basicDetails?.abilities}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <DetailsText ability={item} />}
          />
        </View>

        <View style={styles.DetailView4}>
          <Text style={{color: route.params.color, fontSize: 17}}>
            Moves :{' '}
          </Text>
          <FlatList
            data={basicDetails?.moves}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <DetailsText ability={item} />}
          />
        </View>

        <View style={styles.DetailView5}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 25,
            }}>
            <Text style={{fontSize: 17}}>Base Stats</Text>
          </View>
          <View style={{display: 'flex', alignItems: 'center'}}>
            <BarChart
              data={{
                labels: ['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'],
                datasets: [
                  {
                    data: basicDetails?.stats,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 60}
              height={200}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundGradientFrom: theme.backgroundColor.first,
                backgroundGradientTo: theme.backgroundColor.first,
                color: () => route.params.color,
                strokeWidth: 3,
                barPercentage: 0.7,
              }}
              verticalLabelRotation={0}
              withInnerLines={false}
              showValuesOnTopOfBars={true}
              withVerticalLabels={true}
              withHorizontalLabels={true}
              fromZero={true}
            />
            <ProgressChart
              style={{marginVertical: 10}}
              data={{
                labels: ['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'],
                data: basicDetails?.progressStats,
              }}
              width={Dimensions.get('window').width - 60}
              height={200}
              strokeWidth={8}
              radius={35}
              chartConfig={{
                backgroundGradientFrom: theme.backgroundColor.first,
                backgroundGradientTo: theme.backgroundColor.first,
                color: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
                strokeWidth: 3,
                barPercentage: 0.7,
              }}
              hideLegend={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;
