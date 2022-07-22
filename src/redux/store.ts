import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./pokemonSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/pokemonSaga";

let SagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer : {
        pokemon : pokemonSlice,
    },
    middleware : [SagaMiddleware]
});

SagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;