import {
    Box,
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { useNavigate } from "react-router-dom";
import { TCart, TProductCart, useGetUserCartsQuery } from "../api/fakeStoreApi";
import { useEffect } from "react";
import CartProductItem from "../components/cart/CartProductItem";
import CartProductList from "../components/cart/CartProductList";

export default function CartPage() {
    const navigate = useNavigate();
    const { data: carts = [], isLoading } = useGetUserCartsQuery(1);

    return (
        <Container sx={{ py: 5 }} maxWidth="lg">
            <Box sx={{ mb: 2 }}>
                <Button
                    color="inherit"
                    onClick={() => navigate(-1)}
                    startIcon={<ArrowBackIosNewIcon />}
                >
                    Back
                </Button>
            </Box>
            {carts.map((cart: TCart) => (
                <CartProductList key={cart.id} cart={cart} />
            ))}
        </Container>
    );
}
