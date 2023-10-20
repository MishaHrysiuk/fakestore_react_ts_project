import { useState } from "react";
import { TProduct } from "../api/fakeStoreApi";
import { TSort } from "../store/searchSlice";

export default function useFiltering() {
    const [search, setSearch] = useState("");
    const [maxPrice, setMaxPrice] = useState(500);

    const searchProduct = (items: TProduct[], term: string) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(
            (item) =>
                item.title.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                item.description.toLowerCase().indexOf(term.toLowerCase()) >
                    -1 ||
                item.category.toLowerCase().indexOf(term.toLowerCase()) > -1,
        );
    };

    const sortingProducts = (items: TProduct[], term: TSort) => {
        if (term === "chp") {
            return items.slice().sort((a, b) => {
                return a.price - b.price;
            });
        } else if (term === "exp") {
            return items.slice().sort((a, b) => {
                return b.price - a.price;
            });
        } else return items;
    };

    const maxPriceProduct = (items: TProduct[], term: number) => {
        return items.filter((item) => +item.price < +term);
    };

    const dataFiltering = (data: TProduct[]) => {
        return maxPriceProduct(searchProduct(data, search), maxPrice);
    };

    return {
        dataFiltering,
        setSearch,
        setMaxPrice,
        search,
        maxPrice,
        searchProduct,
        sortingProducts,
    };
}
