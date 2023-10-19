import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    FormControlLabel,
    Switch,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { useNavigate } from "react-router-dom";
import { TCart, useGetUserCartsQuery } from "../api/fakeStoreApi";
import CartProductList from "../components/cart/CartProductList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectAuth } from "../store/authSlice";
import { changeShowLocalCart, selectLocalCart } from "../store/localCartSlice";

export default function CartPage() {
    const navigate = useNavigate();
    const { id } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const { data: carts = [], isLoading } = useGetUserCartsQuery(id);
    const { carts: localCarts, showLocalCart } =
        useAppSelector(selectLocalCart);

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
                <Box
                    sx={{
                        mb: 2,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button
                        color="inherit"
                        onClick={() => navigate(-1)}
                        startIcon={<ArrowBackIosNewIcon />}
                    >
                        Back
                    </Button>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={showLocalCart}
                                onChange={() => dispatch(changeShowLocalCart())}
                            />
                        }
                        label="Show local cart"
                    />
                </Box>
                {showLocalCart
                    ? localCarts
                          .filter((cart) => cart.userId === id)
                          .map((cart: TCart) => (
                              <CartProductList key={cart.id} cart={cart} />
                          ))
                    : carts.map((cart: TCart) => (
                          <CartProductList key={cart.id} cart={cart} />
                      ))}
            </Container>
        </>
    );
}
