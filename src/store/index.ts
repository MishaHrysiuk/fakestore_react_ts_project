import { configureStore } from "@reduxjs/toolkit";
import { fakeStoreApi } from "../api/fakeStoreApi";
import searchReducer from "./searchSlice";
import authReducer from "./authSlice";
import localCartReducer from "./localCartSlice";

export const store = configureStore({
    reducer: {
        [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
        search: searchReducer,
        auth: authReducer,
        localCart: localCartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(fakeStoreApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
