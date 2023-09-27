import { configureStore } from "@reduxjs/toolkit";
import { fakeStoreApi } from "../store/fakeStoreApi";

export const store = configureStore({
    reducer: { [fakeStoreApi.reducerPath]: fakeStoreApi.reducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(fakeStoreApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
});
