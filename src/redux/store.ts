import { configureStore, compose } from "@reduxjs/toolkit";
import pokemonSlice from "./pokemonSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/pokemonSaga";
import logger from "redux-logger";
import Reactotron from '../../config/ReactotronConfig';

let SagaMiddleware;
if(__DEV__){
    let sagaMonitor = Reactotron.createSagaMonitor();
    SagaMiddleware = createSagaMiddleware({sagaMonitor});
}else{
    SagaMiddleware = createSagaMiddleware();
}



const store = configureStore({
    reducer : {
        pokemon : pokemonSlice,
    },
    middleware : [SagaMiddleware,logger],
    enhancers : [Reactotron.createEnhancer()]
});

SagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;