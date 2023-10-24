import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export type TSort = "default" | "exp" | "chp";

export interface ISearchState {
    search: string;
    sortType: TSort;
    elementCountOnPage: number;
}

const initialState: ISearchState = {
    search: "",
    sortType: "default",
    elementCountOnPage: 4,
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
            state.sortType = "default";
        },
        changeElementCountOnPage: (state, action: PayloadAction<number>) => {
            state.elementCountOnPage = action.payload;
        },
    },
});

export const selectSearch: (state: RootState) => ISearchState = (
    state: RootState,
) => state.search;

export const {
    changeSearch,
    clearSearch,
    changeSortType,
    clearSortType,
    changeElementCountOnPage,
} = searchSlice.actions;

export default searchSlice.reducer;
