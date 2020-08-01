import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "./Reducers";

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const loggerMiddleware = createLogger();

export default function configureStore() {
    let store = createStore(
        persistedReducer,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    );
    let persistor = persistStore(store);
    return { store, persistor };
}