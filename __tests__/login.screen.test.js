import React from 'react';
import LoginScreen from "../src/screens/beforelogin/LoginScreen";
import {fireEvent, render} from '@testing-library/react-native';
import SignUpScreen from '../src/screens/beforelogin/SignUpScreen';

describe('Login Screen tests', () => {
    // it("should go to home screen on successful login", () => {
    //     const navigation = { navigate : () =>  {} }
    //     const particularUser = [{
    //         name : "Manoj",
    //         email : "manoj@gmail.com",
    //         password : "Manoj123"
    //     }]
    //     spyOn(navigation, 'navigate');
    //     const page = render(<LoginScreen navigation={navigation} details = {{ email : "manoj@gmail.com" , password : "Manoj123"}} />);
    //     const loginButton = page.getByTestId('login-button');
    //     fireEvent.press(loginButton);

    //     expect(navigation.navigate).toHaveBeenCalledWith('Home');
    //     //expect(navigation.reset).toBeCalled();
    // })



    it("should go to sign up page on clicking create here link", () => {
        const navigation = {navigate : () => {}};
        spyOn(navigation, 'navigate');
        
        const page = render(<LoginScreen navigation={navigation} />);
        const createLink = page.getByTestId('create-link');
        fireEvent.press(createLink);
        expect(navigation.navigate).toHaveBeenCalledWith("SignUp")

    })


    it("should go back to previous page on clicking back icon", () => {
        const navigation = { goBack : () => {}};
        spyOn(navigation,'goBack');

        const page = render(<LoginScreen navigation={navigation} />);
        const backIcon = page.getByTestId('go-back');
        fireEvent.press(backIcon);
        expect(navigation.goBack).toBeCalled();
        
    })


    it("should display text fields for email and password ", () => {
        const page = render(<LoginScreen/>);
        const InputFields = page.getAllByTestId('input-field');
        expect(InputFields.length).toBe(2);
    })

    it('should display login button to login', () => {
        const page = render(<LoginScreen/>);
        const LoginButton = page.getByTestId('login-button');
        expect(LoginButton).toBeTruthy();
    })
})