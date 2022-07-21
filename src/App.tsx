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


import React, { type PropsWithChildren } from 'react';
import LoginScreen from './screens/beforelogin/LoginScreen';
import OpenScreen from './screens/beforelogin/OpenScreen';
import SignUpScreen from './screens/beforelogin/SignUpScreen';
import HomeScreen from './screens/afterlogin/HomeScreen';
import DetailsScreen from './screens/afterlogin/DetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AppStackParams} from "./types"



let AppStack = createNativeStackNavigator<AppStackParams>();

const App: React.FC = () => {


  return (
    <NavigationContainer>
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
    

  );
};



export default App;
