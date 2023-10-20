import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface IAuthState {
    id: number | null;
    token: string | null;
}

const initialState: IAuthState = {
    id: null,
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{ id: number; token: string }>,
        ) => {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: action.payload.id,
                    token: action.payload.token,
                }),
            );
            state.id = action.payload.id;
            state.token = action.payload.token;
        },
        logout: (state) => {
            localStorage.removeItem("user");
            state.id = null;
            state.token = null;
        },
    },
});

export const selectAuth: (state: RootState) => IAuthState = (
    state: RootState,
) => state.auth;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
