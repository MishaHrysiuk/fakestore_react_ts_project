import { useState } from "react";

export default function usePagging<T>(startPage = 1, elemOnPage = 4) {
    const [currentPage, setCurrentPage] = useState(startPage);
    const [countElemOnPage, setCountElemOnPage] = useState(elemOnPage);

    const nextPage = (list: Array<T>) => {
        if (currentPage + 1 <= Math.ceil(list.length / countElemOnPage)) {
            setCurrentPage((currentPage) => currentPage + 1);
        }
    };

    const getAllPages = (list: Array<T>) => {
        return Math.ceil(list.length / countElemOnPage);
    };

    const prevPage = () => {
        if (currentPage - 1 > 0) {
            setCurrentPage((currentPage) => currentPage - 1);
        }
    };

    const firstPage = () => {
        setCurrentPage(1);
    };

    const lastPage = (list: Array<T>) => {
        if (Math.ceil(list.length / countElemOnPage) !== 0) {
            setCurrentPage(Math.ceil(list.length / countElemOnPage));
        }
    };

    return {
        currentPage,
        countElemOnPage,
        setCurrentPage,
        setCountElemOnPage,
        nextPage,
        prevPage,
        firstPage,
        lastPage,
        getAllPages,
    };
}
