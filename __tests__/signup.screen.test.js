import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SignUpScreen from "../src/screens/beforelogin/SignUpScreen";

describe('Signup screen test cases', () => { 
    it("should display 3 test fields for name, email and password",() => {
        const page = render(<SignUpScreen />);
        const InputFields = page.getAllByTestId('input-field');
        expect(InputFields.length).toBe(3);
    })

    it("should display signUp button to signUp",() => {
        const page = render(<SignUpScreen />);
        const SignUpButton = page.getByTestId('signup-button');
        expect(SignUpButton).toBeTruthy();

    })

    it("should navigate to login page on clicking login here",() => {
        const navigation = {navigate : () => {}};
        spyOn(navigation, 'navigate');
        
        const page = render(<SignUpScreen navigation={navigation} />);
        const loginHereLink = page.getByTestId('login-here');
        fireEvent.press(loginHereLink);
        expect(navigation.navigate).toHaveBeenCalledWith("Login")
    })

    it("should navigate back to previous page on clicking back icon",() => {
        const navigation = { goBack : () => {}};
        spyOn(navigation,'goBack');

        const page = render(<SignUpScreen navigation={navigation} />);
        const backIcon = page.getByTestId('go-back');
        fireEvent.press(backIcon);
        expect(navigation.goBack).toBeCalled();
    })
})