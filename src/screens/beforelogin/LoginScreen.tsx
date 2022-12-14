import React, {useState,useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ToastAndroid,
} from 'react-native';
import styles from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParams, UserDetails} from '../../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from 'react-native-paper';
type Props = {
  navigation: NativeStackNavigationProp<AppStackParams, 'Login'>;
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [passwordMask, setPasswordMask] = useState<boolean>(true);

  const email_ref = useRef();
  const password_ref = useRef();
  const theme = useTheme();

  //get particular user by input email id. check if password is correct or not.
  //if correct -> navigate to Home Page
  //else -> toast an error.
  const authenticateUser = async (): Promise<void> => {
    let users: string | null = await AsyncStorage.getItem('@users');
    if (users == null || users == '[]') {
      ToastAndroid.showWithGravity(
        'User not found!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      let usersJSON: UserDetails[] | [] = JSON.parse(users);
      let particularUser: UserDetails[] | [] = usersJSON.filter(
        user => user.email == inputEmail,
      );
      if (particularUser.length === 0) {
        ToastAndroid.showWithGravity(
          'Invalid Email or Password !',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } else {
        if (particularUser[0].password === inputPassword) {
          ToastAndroid.showWithGravity(
            'User Logged In successfully!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          await AsyncStorage.setItem('@loggedUser', inputEmail);
          // navigation.navigate("Home",particularUser[0]);
          navigation.reset({
            index: 0,
            routes: [{name: 'Home', params: particularUser[0]}],
          });
        } else {
          ToastAndroid.showWithGravity(
            'Invalid Email or Password !',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      }
    }
  };

  return (
    <View style={[styles.flexFullScreen,{backgroundColor : theme.backgroundColor.first}]}>
      <View style={styles.SignUpTopView}>
        <Image
          source={require('../../assets/pokemon-logo-png.png')}
          style={[styles.Img]}
        />
      </View>

      <View style={styles.SignUpBottomView}>
        <View style={[styles.InputField,{backgroundColor : theme.backgroundColor.second,}]}>
          <View>
            <Icon name="email" size={23} color={theme.textColor.first} />
          </View>
          <TextInput
            testID="input-field"
            style={styles.TextInputField}
            placeholder="email"
            onChangeText={(email) => setInputEmail(email.toLowerCase())}
            autoFocus = {true}
            ref = {email_ref}
            onSubmitEditing = {() => password_ref.current.focus()}
          />
        </View>

        <View style={[styles.InputField,{backgroundColor : theme.backgroundColor.second,}]}>
          <View>
            <Icon2 name="key" size={21} color= {theme.textColor.first} />
          </View>
          <TextInput
            testID="input-field"
            style={styles.TextInputField}
            placeholder="password"
            onChangeText={setInputPassword}
            secureTextEntry={passwordMask}
            ref = {password_ref}
          />
          <View>
            <Icon1
              style={{marginLeft: 5}}
              name={passwordMask ? 'eye' : 'eye-slash'}
              size={23}
              color={theme.textColor.first}
              onPress={() => setPasswordMask(!passwordMask)}
            />
          </View>
        </View>

        <Pressable
          testID="login-button"
          onPress={authenticateUser}
          style={[
            styles.OpenSignupButton,
            {backgroundColor: '#3b810c', marginTop: 60},
            styles.ButtonShadow,
          ]}>
          <Text style={[styles.OpenText, {color: 'white'}]}>Log In</Text>
        </Pressable>

        <View style={styles.DontLink}>
          <Text>Don't have an account? </Text>
          <Pressable
            testID="create-link"
            onPress={(): void => navigation.navigate('SignUp')}>
            <Text style={{color: 'blue'}}>create here</Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.BackButton,{backgroundColor : theme.backgroundColor.second,}]}>
        <Icon
          name="arrow-back"
          color={theme.textColor.first}
          size={30}
          testID="go-back"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
