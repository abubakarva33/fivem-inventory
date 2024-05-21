import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import customizeSliceReducer from "./customizeSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["customizeSec"],
};

const rootReducer = combineReducers({
  customizeSec: customizeSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
