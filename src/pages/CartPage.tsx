import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { useNavigate } from "react-router-dom";
import { TCart, useGetUserCartsQuery } from "../api/fakeStoreApi";
import CartProductList from "../components/cart/CartProductList";
import { useAppSelector } from "../store/hooks";
import { selectAuth } from "../store/authSlice";

export default function CartPage() {
    const navigate = useNavigate();
    const { id } = useAppSelector(selectAuth);
    const { data: carts = [], isLoading } = useGetUserCartsQuery(id);

    return (
        <>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
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
        </>
    );
}
