import React from "react";
import HomeScreen from "../src/screens/afterlogin/HomeScreen";
import { render, fireEvent } from "@testing-library/react-native";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import pokemonSlice from "../src/redux/pokemonSlice";
import Card from "../src/components/Card";

const store = configureStore({ reducer : { pokemon : pokemonSlice } })

describe("HomeScreen tests", () => {
    
    it("should show FlatList",() => {
        const HomePage = render(<Provider store={store}><HomeScreen testing = "true" /></Provider>  );
        const flatList = HomePage.getByTestId('list-of-items');
        expect(flatList).toBeTruthy();
   })


    jest.useFakeTimers();
    it('should navigate to Opoen page on clicking logout Icon',() => {
        const navigation = {
            navigate : () => {}
        }
        spyOn(navigation , 'navigate');
        const HomePage = render(<Provider store={store}><HomeScreen navigation={navigation} testing = "true" /></Provider>  );
        const logOutIcon = HomePage.getByTestId('log-out');
        fireEvent.press(logOutIcon);
        expect(navigation.navigate).toHaveBeenCalledWith('Open')
    })

    it('should display list header',() => {
        const HomePage = render(<Provider store={store}><HomeScreen testing = {true} /></Provider>  );
        const ListHeader = HomePage.getByTestId('flatlist-header');
        expect(ListHeader).toBeTruthy();
    })

    it('should display search box on clicking search icon',() => {
        const HomePage = render(<Provider store={store}><HomeScreen testing = {true} /></Provider>  );
        const SearchBox = HomePage.getByTestId('search-box');
        expect(SearchBox).toBeTruthy();
    })

    it('should display atleast 1 card on loading',() => {
        const HomePage = render(<Provider store={store}><HomeScreen testing = "true" /></Provider>  );
        const flatList = HomePage.getByTestId('list-of-items');
        expect(flatList.children.length).toBeGreaterThan(0);
    })

})
