import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const fakeStoreApi = createApi({
    reducerPath: "FakeStoreAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://fakestoreapi.com",
    }),
    tagTypes: ["Products", "Carts", "Users"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<TProduct[], void>({
            query: () => "/products",
            providesTags: ["Products"],
        }),
        getProductById: builder.query<TProduct, number>({
            query: (id) => `/products/${id}`,
            providesTags: ["Products"],
        }),
        getAllCategories: builder.query<string[], void>({
            query: () => "/products/categories",
        }),
        getProductsByCategory: builder.query<TProduct[], string>({
            query: (category) => `/products/category/${category}`,
            providesTags: ["Products"],
        }),
        addNewProduct: builder.mutation<TProduct, TProduct>({
            query: (product) => ({
                url: "/products",
                method: "POST",
                body: product,
            }),
            invalidatesTags: ["Products"],
        }),
        updateProduct: builder.mutation<
            TProduct,
            {
                id: number;
                product: Partial<TProduct>;
            }
        >({
            query: ({ id, product }) => ({
                url: `/products/${id}`,
                method: "PATCH",
                body: product,
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: builder.mutation<TProduct, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),
        getAllCarts: builder.query<TCart[], void>({
            query: () => "/carts",
            providesTags: ["Carts"],
        }),

        getCartById: builder.query<TCart, number>({
            query: (id) => `/carts/${id}`,
            providesTags: ["Carts"],
        }),
        getCartsInDateRange: builder.query<
            TCart[],
            {
                startDate: "string";
                endDate: "string";
            }
        >({
            query: ({ startDate, endDate }) =>
                `/carts?startdate=${startDate}&enddate=${endDate}`,
            providesTags: ["Carts"],
        }),
        getUserCarts: builder.query<TCart[], number>({
            query: (id) => `/carts/user/${id}`,
            providesTags: ["Carts"],
        }),
        addNewCart: builder.mutation<TCart, TCart>({
            query: (cart) => ({
                url: "/carts",
                method: "POST",
                body: cart,
            }),
            invalidatesTags: ["Carts"],
        }),
        updateCart: builder.mutation<
            TCart,
            { id: number; cart: Partial<TCart> }
        >({
            query: ({ id, cart }) => ({
                url: `/carts/${id}`,
                method: "PUTCH",
                body: cart,
            }),
            invalidatesTags: ["Carts"],
        }),
        deleteCart: builder.mutation<TCart, number>({
            query: (id) => ({
                url: `/carts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Carts"],
        }),
        getAllUsers: builder.query<TUser[], void>({
            query: () => "/users",
            providesTags: ["Users"],
        }),
        getUserById: builder.query<TUser, number>({
            query: (id) => `/users/${id}`,
            providesTags: ["Users"],
        }),
        addNewUser: builder.mutation<TUser, TUser>({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["Users"],
        }),
        updateUser: builder.mutation<
            TUser,
            { id: number; user: Partial<TUser> }
        >({
            query: ({ id, user }) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body: user,
            }),
            invalidatesTags: ["Users"],
        }),
        deleteUser: builder.mutation<TUser, number>({
            query: (id) => ({
                url: `/users${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
        loginUser: builder.mutation<string, TUserLogin>({
            query: ({ username, password }) => ({
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
    id?: number;
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
    useGetProductsByCategoryQuery,
    useGetProductByIdQuery,
    useGetUserByIdQuery,
    useGetUserCartsQuery,
    useUpdateCartMutation,
    useLoginUserMutation,
    useUpdateProductMutation,
    useUpdateUserMutation,
} = fakeStoreApi;
