import React, {useState} from 'react';
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

export interface Props {
  navigation: NativeStackNavigationProp<AppStackParams, 'SignUp'>;
}

const SignUpScreen: React.FC<Props> = ({navigation}) => {
  const [inputName, setInputName] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [passwordMask, setPasswordMask] = useState<boolean>(true);

  //This function validates the given inputs and returns true or false
  let validateUser = (): boolean => {
    if (inputName.length <= 2) {
      ToastAndroid.showWithGravity(
        'Name should be greater than 2 characters',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return false;
    } else if (!inputEmail.includes('@gmail.com')) {
      ToastAndroid.showWithGravity(
        'Invalid Email',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return false;
    } else if (inputPassword.length <= 5) {
      ToastAndroid.showWithGravity(
        'Password should be grater than 5 characters',
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
    <View style={styles.flexFullScreen}>
      <View style={styles.SignUpTopView}>
        <Image
          source={{
            uri: 'https://1000logos.net/wp-content/uploads/2017/05/Pokemon-Logo-768x480.png',
          }}
          style={[styles.Img]}
        />
      </View>

      <View style={styles.SignUpBottomView}>
        <View style={styles.InputField}>
          <View>
            <Icon1 name="user" size={23} color="black" />
          </View>
          <TextInput
            testID="input-field"
            style={styles.TextInputField}
            placeholder="Name"
            onChangeText={setInputName}
          />
        </View>

        <View style={styles.InputField}>
          <View>
            <Icon name="email" size={23} color="black" />
          </View>
          <TextInput
            testID="input-field"
            style={styles.TextInputField}
            placeholder="email"
            onChangeText={setInputEmail}
          />
        </View>

        <View style={styles.InputField}>
          <View>
            <Icon2 name="key" size={20} color="black" />
          </View>
          <TextInput
            testID="input-field"
            style={styles.TextInputField}
            placeholder="password"
            onChangeText={setInputPassword}
            secureTextEntry={passwordMask}
          />
          <View>
            <Icon1
              style={{marginLeft: 5}}
              name={passwordMask ? 'eye' : 'eye-slash'}
              size={23}
              color="black"
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

      <View style={styles.BackButton}>
        <Icon
          testID="go-back"
          name="arrow-back"
          color={'black'}
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default SignUpScreen;
