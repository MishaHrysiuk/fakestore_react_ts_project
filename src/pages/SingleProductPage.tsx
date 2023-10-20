import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../api/fakeStoreApi";
import { enqueueSnackbar } from "notistack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { addProductToCart } from "../store/localCartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectAuth } from "../store/authSlice";

export default function SingleProductPage() {
    const { productId } = useParams();
    const { data: product, isLoading } = useGetProductByIdQuery(
        +(productId as string),
    );

    const { id } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

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
            {isLoading ? null : (
                <Container
                    maxWidth="lg"
                    sx={{
                        py: 5,
                        justifyContent: "center",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: { xs: "center", md: "flex-start" },
                    }}
                >
                    <Button
                        color="inherit"
                        onClick={() => navigate(-1)}
                        startIcon={<ArrowBackIosNewIcon />}
                    >
                        Back
                    </Button>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: { xs: "column", md: "row" },
                            alignItems: { xs: "center", md: "flex-start" },
                        }}
                    >
                        <Box
                            component="img"
                            sx={{
                                maxWidth: { xs: "100%", sm: 400, lg: 500 },
                                maxHeight: { xs: "auto", lg: 500 },
                                m: 2,
                                objectFit: "fill",
                            }}
                            alt={product?.title}
                            src={product?.image}
                        />
                        <Box
                            sx={{
                                m: 2,
                            }}
                        >
                            <Typography
                                sx={{ mb: 3 }}
                                variant="h3"
                                component="h1"
                            >
                                {product?.title}
                            </Typography>
                            <Typography
                                sx={{ mb: 3 }}
                                variant="h5"
                                component="h3"
                            >
                                <span style={{ fontWeight: 700 }}>
                                    Category:{" "}
                                </span>{" "}
                                {product?.category}
                            </Typography>
                            <Typography
                                sx={{ mb: 3 }}
                                variant="h5"
                                component="h4"
                            >
                                <span style={{ fontWeight: 700 }}>
                                    Description:{" "}
                                </span>
                                {product?.description}
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    alignItems: "flex-start",
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    sx={{ mr: 5, mb: { xs: 3, sm: 0 } }}
                                >
                                    {product?.price} $
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="success"
                                    startIcon={<ShoppingCartIcon />}
                                    onClick={() => {
                                        dispatch(
                                            addProductToCart({
                                                userId: id as number,
                                                productId:
                                                    product?.id as number,
                                            }),
                                        );
                                        enqueueSnackbar(
                                            `Product №${product?.id} added to cart`,
                                            {
                                                variant: "success",
                                                autoHideDuration: 3000,
                                                anchorOrigin: {
                                                    horizontal: "right",
                                                    vertical: "bottom",
                                                },
                                            },
                                        );
                                    }}
                                >
                                    Add to cart
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            )}
        </>
    );
}
