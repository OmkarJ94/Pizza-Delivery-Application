
import cardItems from "./reducer"
import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { devToolsEnhancer } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
const persistConfig = {
    key: 'root',
    storage,
};
const reducers = combineReducers({
    cardItems
})

const persistedReducer = persistReducer(persistConfig, reducers);

// const store = createStore(root, devToolsEnhancer());

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})


