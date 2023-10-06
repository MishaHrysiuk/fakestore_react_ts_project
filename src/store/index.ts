import { configureStore } from "@reduxjs/toolkit";
import { fakeStoreApi } from "../api/fakeStoreApi";
import searchReducer from "./searchSlice";

export const store = configureStore({
    reducer: {
        [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
        search: searchReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(fakeStoreApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
