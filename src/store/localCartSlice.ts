import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { TCart } from "../api/fakeStoreApi";

export interface ILocalCartState {
    carts: TCart[];
    showLocalCart: boolean;
}

const initialState: ILocalCartState = {
    carts: [],
    showLocalCart: true,
};
export const localCartSlice = createSlice({
    name: "localCart",
    initialState,
    reducers: {
        changeShowLocalCart: (state) => {
            state.showLocalCart = !state.showLocalCart;
        },
        setCartList: (state, action: PayloadAction<TCart[]>) => {
            localStorage.setItem("cart-list", JSON.stringify(action.payload));
            state.carts = action.payload;
        },
        createCart: (state, action: PayloadAction<{ userId: number }>) => {
            if (
                !state.carts.filter(
                    (cart) => cart.userId === action.payload.userId
                )[0]
            ) {
                const newCartList = [
                    ...state.carts,
                    {
                        id: action.payload.userId,
                        userId: action.payload.userId,
                        date: new Date().toISOString(),
                        products: [],
                    },
                ];
                localStorage.setItem("cart-list", JSON.stringify(newCartList));
                state.carts.push({
                    id: action.payload.userId,
                    userId: action.payload.userId,
                    date: new Date().toISOString(),
                    products: [],
                });
            }
        },
        addProductToCart: (
            state,
            action: PayloadAction<{ userId: number; productId: number }>
        ) => {
            const otherCarts = state.carts.filter(
                (cart) => cart.userId !== action.payload.userId
            );
            const userCart = state.carts.filter(
                (cart) => cart.userId === action.payload.userId
            )[0];
            const userProducts = userCart.products;

            if (
                userProducts.every(
                    (product) => product.productId !== action.payload.productId
                )
            ) {
                userProducts.push({
                    productId: action.payload.productId,
                    quantity: 1,
                });
                const newUserCart = {
                    ...userCart,
                    products: userProducts,
                };
                localStorage.setItem(
                    "cart-list",
                    JSON.stringify([...otherCarts, newUserCart])
                );

                state.carts = [...otherCarts, newUserCart];
            }
        },
        deleteProductFromCart: (
            state,
            action: PayloadAction<{ userId: number; productId: number }>
        ) => {
            const otherCarts = state.carts.filter(
                (cart) => cart.userId !== action.payload.userId
            );
            const userCart = state.carts.filter(
                (cart) => cart.userId === action.payload.userId
            )[0];
            const userProducts = userCart.products;

            if (
                userProducts.some(
                    (product) => product.productId === action.payload.productId
                )
            ) {
                const index = userProducts.findIndex(
                    (product) => product.productId === action.payload.productId
                );
                userProducts.splice(index, 1);
                const newUserCart = {
                    ...userCart,
                    products: userProducts,
                };
                localStorage.setItem(
                    "cart-list",
                    JSON.stringify([...otherCarts, newUserCart])
                );

                state.carts = [...otherCarts, newUserCart];
            }
        },
        increaseQuantityOfProduct: (
            state,
            action: PayloadAction<{ userId: number; productId: number }>
        ) => {
            const otherCarts = state.carts.filter(
                (cart) => cart.userId !== action.payload.userId
            );
            const userCart = state.carts.filter(
                (cart) => cart.userId === action.payload.userId
            )[0];
            const userProducts = userCart.products;

            if (
                userProducts.some(
                    (product) => product.productId === action.payload.productId
                )
            ) {
                const index = userProducts.findIndex(
                    (product) => product.productId === action.payload.productId
                );
                userProducts[index].quantity++;
                const newUserCart = {
                    ...userCart,
                    products: userProducts,
                };
                localStorage.setItem(
                    "cart-list",
                    JSON.stringify([...otherCarts, newUserCart])
                );

                state.carts = [...otherCarts, newUserCart];
            }
        },
        decreaseQuantityOfProduct: (
            state,
            action: PayloadAction<{ userId: number; productId: number }>
        ) => {
            const otherCarts = state.carts.filter(
                (cart) => cart.userId !== action.payload.userId
            );
            const userCart = state.carts.filter(
                (cart) => cart.userId === action.payload.userId
            )[0];
            const userProducts = userCart.products;

            if (
                userProducts.some(
                    (product) => product.productId === action.payload.productId
                )
            ) {
                const index = userProducts.findIndex(
                    (product) => product.productId === action.payload.productId
                );
                if (userProducts[index].quantity === 1) {
                    userProducts.splice(index, 1);
                } else {
                    userProducts[index].quantity--;
                }
                const newUserCart = {
                    ...userCart,
                    products: userProducts,
                };
                localStorage.setItem(
                    "cart-list",
                    JSON.stringify([...otherCarts, newUserCart])
                );

                state.carts = [...otherCarts, newUserCart];
            }
        },
    },
});

export const selectLocalCart = (state: RootState) => state.localCart;

export const {
    setCartList,
    addProductToCart,
    createCart,
    deleteProductFromCart,
    increaseQuantityOfProduct,
    decreaseQuantityOfProduct,
    changeShowLocalCart,
} = localCartSlice.actions;

export default localCartSlice.reducer;
