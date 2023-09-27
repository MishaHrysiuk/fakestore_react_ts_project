import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const fakeStoreApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://fakestoreapi.com",
    }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "/products",
        }),
        getProductById: builder.query({
            query: (id: number) => `/product/${id}`,
        }),
        getAllCategories: builder.query({
            query: () => "/products/categories",
        }),
        getCategoryByName: builder.query({
            query: (name: string) => `/products/category/${name}`,
        }),
        addNewProduct: builder.mutation({
            query: (product: TProduct) => ({
                url: "/products",
                method: "POST",
                body: product,
            }),
        }),
        updateProduct: builder.mutation({
            query: ({
                id,
                product,
            }: {
                id: number;
                product: Partial<TProduct>;
            }) => ({
                url: `/products/${id}`,
                method: "PATCH",
                body: product,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (id: number) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
        }),
        getAllCarts: builder.query({
            query: () => "/carts",
        }),
        getCartById: builder.query({
            query: (id: number) => `/carts/${id}`,
        }),
        getCartsInDateRange: builder.query({
            query: ({
                startDate,
                endDate,
            }: {
                startDate: "string";
                endDate: "string";
            }) => `/carts?startdate=${startDate}&enddate=${endDate}`,
        }),
        getUserCarts: builder.query({
            query: (id: number) => `/carts/user/${id}`,
        }),
        addNewCart: builder.mutation({
            query: (cart: TCart) => ({
                url: "/carts",
                method: "POST",
                body: cart,
            }),
        }),
        updateCart: builder.mutation({
            query: ({ id, cart }: { id: number; cart: Partial<TCart> }) => ({
                url: `/carts/${id}`,
                method: "PUTCH",
                body: cart,
            }),
        }),
        deleteCart: builder.mutation({
            query: (id: number) => ({
                url: `/carts/${id}`,
                method: "DELETE",
            }),
        }),
        getAllUsers: builder.query({
            query: () => "/users",
        }),
        getUserById: builder.query({
            query: (id: number) => `/users/${id}`,
        }),
        addNewUser: builder.mutation({
            query: (user: TUser) => ({
                url: "/users",
                method: "POST",
                body: user,
            }),
        }),
        updateUser: builder.mutation({
            query: ({ id, user }: { id: number; user: Partial<TUser> }) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body: user,
            }),
        }),
        deleteUser: builder.mutation({
            query: (id: number) => ({
                url: `/users${id}`,
                method: "DELETE",
            }),
        }),
        loginUser: builder.mutation({
            query: ({ username, password }: TUserLogin) => ({
                url: `/auth/login`,
                method: "DELETE",
                body: { username, password },
            }),
        }),
    }),
});

export type TProduct = {
    id?: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
};

export type TProductCart = {
    productId: number;
    quantity: number;
};

export type TCart = {
    userId: number;
    date: string;
    products: Array<TProductCart>;
};

export type TUserLogin = {
    username: string;
    password: string;
};

export type TUserName = {
    firstname: string;
    lastname: string;
};

export type TGeoLocation = {
    lat: string;
    long: string;
};

export type TAddress = {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: TGeoLocation;
};

export type TUser = {
    email: string;
    username: string;
    password: string;
    name: TUserName;
    address: TAddress;
    phone: string;
};

export const {
    useGetAllProductsQuery,
    useGetAllCartsQuery,
    useAddNewCartMutation,
    useAddNewProductMutation,
    useAddNewUserMutation,
    useDeleteCartMutation,
    useDeleteProductMutation,
    useDeleteUserMutation,
    useGetAllCategoriesQuery,
    useGetAllUsersQuery,
    useGetCartByIdQuery,
    useGetCartsInDateRangeQuery,
    useGetCategoryByNameQuery,
    useGetProductByIdQuery,
    useGetUserByIdQuery,
    useGetUserCartsQuery,
    useUpdateCartMutation,
    useLoginUserMutation,
    useUpdateProductMutation,
    useUpdateUserMutation,
} = fakeStoreApi;
