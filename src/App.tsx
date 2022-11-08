/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
// shorturl.at/dPZ69


import React, { type PropsWithChildren, useEffect } from 'react';
import LoginScreen from './screens/beforelogin/LoginScreen';
import OpenScreen from './screens/beforelogin/OpenScreen';
import SignUpScreen from './screens/beforelogin/SignUpScreen';
import HomeScreen from './screens/afterlogin/HomeScreen';
import DetailsScreen from './screens/afterlogin/DetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AppStackParams} from "./types"
import store from "./redux/store";
import { Provider } from "react-redux";
import SplashScreen from 'react-native-splash-screen';
import {useColorScheme} from 'react-native';
import reactotron from 'reactotron-react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

let AppStack = createNativeStackNavigator<AppStackParams>();

const App: React.FC = () => {
  const colorScheme =useColorScheme();

  const lightTheme = {
    ...DefaultTheme,
    backgroundColor: {
      first: "white",
      second:"#DADADA",
    },
    textColor:{
      first:"black",
      second:"dimgrey",
      third:"green"
    }
  };

  const darkTheme = {
    ...DefaultTheme,
    backgroundColor: {
      first: "#282828",
      second:"#404040",
    },
    textColor:{
      first:"white",
      second:"smokeWhite",
      third:"green"
    }
  }

  useEffect(() => {
    SplashScreen.hide();
  },[]);


  return (
    <Provider store={store}>
    <PaperProvider theme = { colorScheme === 'light' ? lightTheme : darkTheme}>
    <NavigationContainer >
        <AppStack.Navigator initialRouteName='Open'>
            <AppStack.Screen  
                name='Open' 
                component={OpenScreen} 
                options = {{
                  header : () => null
                }}  
              />
            <AppStack.Screen 
                name='SignUp' 
                component={SignUpScreen}
                options = {{
                  header : () => null
                }} 
              />
            <AppStack.Screen 
                name='Login' 
                component={LoginScreen} 
                options = {{
                  header : () => null
                }} 
              />
            <AppStack.Screen 
                name='Home' 
                component={HomeScreen}
                options = {{
                  header : () => null
                }} 
              />

            <AppStack.Screen 
                name='Details' 
                component={DetailsScreen}
                options = {{
                  header : () => null
                }} 
              />
        </AppStack.Navigator>
    </NavigationContainer>
    </PaperProvider>
    </Provider>

  );
};



export default App;
