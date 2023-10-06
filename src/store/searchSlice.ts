import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TSort = "norm" | "exp" | "chp";

export interface SearchState {
    search: string;
    sortType: TSort;
}

const initialState: SearchState = {
    search: "",
    sortType: "norm",
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        changeSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        clearSearch: (state) => {
            state.search = "";
        },
        changeSortType: (state, action: PayloadAction<TSort>) => {
            state.sortType = action.payload;
        },
        clearSortType: (state) => {
            state.sortType = "norm";
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeSearch, clearSearch, changeSortType, clearSortType } =
    searchSlice.actions;

export default searchSlice.reducer;
