
import cardItems from "./reducer"
import { combineReducers, createStore } from "redux"
import { devToolsEnhancer } from 'redux-devtools-extension';

const root = combineReducers({
    cardItems
})

const store = createStore(root, devToolsEnhancer());

export default store;