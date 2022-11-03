import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reactotronRedux } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga';

const reactotron = Reactotron
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .use(reactotronRedux())//for connecting to redux.
  .use(sagaPlugin())//for connecting to redux saga
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!


export default reactotron;