import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export type TSort = "norm" | "exp" | "chp";

export interface ISearchState {
    search: string;
    sortType: TSort;
}

const initialState: ISearchState = {
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

export const selectSearch = (state: RootState) => state.search;

export const { changeSearch, clearSearch, changeSortType, clearSortType } =
    searchSlice.actions;

export default searchSlice.reducer;
