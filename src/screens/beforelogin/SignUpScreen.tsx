import React, {useState, useRef} from 'react';
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
export interface Props {
  navigation: NativeStackNavigationProp<AppStackParams, 'SignUp'>;
}

const SignUpScreen: React.FC<Props> = ({navigation}) => {
  const [inputName, setInputName] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [passwordMask, setPasswordMask] = useState<boolean>(true);

  const username_ref = useRef();
  const email_ref = useRef();
  const password_ref = useRef();

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //password -> minimum 8 chars + atleact 1 number + atleast 1 char
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  const theme = useTheme();
  //This function validates the given inputs and returns true or false
  let validateUser = (): boolean => {
    if (inputName.length <= 2) {
      ToastAndroid.showWithGravity(
        'Name should be greater than 2 characters',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return false;
    } else if (!emailRegex.test(inputEmail)) {
      ToastAndroid.showWithGravity(
        'Invalid Email',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return false;
    } else if (!passwordRegex.test(inputPassword)) {
      ToastAndroid.showWithGravity(
        'Password should be minimum 8 characters, has at least one letter and one number:',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return false;
    } else {
      return true;
    }
  };

  //if valid inputs are entered, it will store the user details in async storage and navigates to login page
  // if not toasts an error saying enter valid inputs.
  let registerUser = async (): Promise<void> => {
    if (validateUser()) {
      try {
        let users: string | null = await AsyncStorage.getItem('@users');
        if (users == null) {
          let newUsers: UserDetails[] = [
            {
              name: inputName,
              email: inputEmail,
              password: inputPassword,
            },
          ];
          await AsyncStorage.setItem('@users', JSON.stringify(newUsers));
          ToastAndroid.showWithGravity(
            'User created successfully!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          navigation.navigate('Login');
        } else {
          let userDetailsJson: UserDetails[] = JSON.parse(users);
          if (
            userDetailsJson.filter(user => user.email == inputEmail).length > 0
          ) {
            ToastAndroid.showWithGravity(
              'User already present!',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          } else {
            userDetailsJson.push({
              name: inputName,
              email: inputEmail,
              password: inputPassword,
            });
            await AsyncStorage.setItem(
              '@users',
              JSON.stringify(userDetailsJson),
            );
            ToastAndroid.showWithGravity(
              'User created successfully!',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
            navigation.navigate('Login');
          }
        }
      } catch (error) {
        ToastAndroid.showWithGravity(
          'Error while creating a User!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
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
            <Icon1 name="user" size={23} color={theme.textColor.first} />
          </View>
          <TextInput
            testID="input-field"
            style={styles.TextInputField}
            placeholder="Name"
            onChangeText={setInputName}
            ref = {username_ref}
            autoFocus = {true}
            onSubmitEditing = {() => email_ref.current.focus()}
          />
        </View>

        <View style={[styles.InputField,{backgroundColor : theme.backgroundColor.second,}]}>
          <View>
            <Icon name="email" size={23} color={theme.textColor.first} />
          </View>
          <TextInput
            testID="input-field"
            style={styles.TextInputField}
            placeholder="email"
            onChangeText={(email) => setInputEmail(email.toLowerCase())}
            ref = {email_ref}
            onSubmitEditing = {() => password_ref.current.focus()}
          />
        </View>

        <View style={[styles.InputField,{backgroundColor : theme.backgroundColor.second,}]}>
          <View>
            <Icon2 name="key" size={20} color={theme.textColor.first}/>
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
          testID="signup-button"
          onPress={registerUser}
          style={({pressed}) => [
            styles.OpenSignupButton,
            {backgroundColor: pressed ? '#519e1e' : '#3b810c', marginTop: 60},
            styles.ButtonShadow,
          ]}>
          <View>
            <Text style={[styles.OpenText, {color: 'white'}]}>Sign Up</Text>
          </View>
        </Pressable>

        <View style={styles.DontLink}>
          <Text>Already have an account? </Text>
          <Pressable
            testID="login-here"
            onPress={(): void => navigation.navigate('Login')}>
            <Text style={{color: 'blue'}}>login here</Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.BackButton,{backgroundColor : theme.backgroundColor.second,}]}>
        <Icon
          testID="go-back"
          name="arrow-back"
          color={theme.textColor.first}
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default SignUpScreen;
