import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Pagination,
    Rating,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import CardLoadingSkeleton from "../components/CardLoadingSkeleton";
import { TProduct } from "../api/fakeStoreApi";
import SearchIcon from "@mui/icons-material/Search";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import useFiltering from "../hooks/useFiltering";
import { useEffect, useMemo } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
    TSort,
    changeElementCountOnPage,
    changeSortType,
    selectSearch,
} from "../store/searchSlice";
import usePagging from "../hooks/usePaginate";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectAuth } from "../store/authSlice";
import { addProductToCart, createCart } from "../store/localCartSlice";

export default function ProductsList(props: {
    isLoading: boolean;
    isSuccess: boolean;
    products: TProduct[];
}) {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { search, sortType, elementCountOnPage } =
        useAppSelector(selectSearch);
    const { id, token } = useAppSelector(selectAuth);

    const dispatch = useAppDispatch();

    const { searchProduct, sortingProducts } = useFiltering();
    const {
        currentPage,
        countElemOnPage,
        setCurrentPage,
        getAllPages,
        setCountElemOnPage,
    } = usePagging<TProduct>(elementCountOnPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [setCurrentPage, search, props.products, countElemOnPage]);

    useEffect(() => {
        if (id) {
            dispatch(createCart({ userId: id }));
        }
    });

    const filteredData = useMemo(() => {
        return sortingProducts(searchProduct(props.products, search), sortType);
    }, [props.products, search, sortType, searchProduct, sortingProducts]);

    const paginatedData = useMemo(() => {
        const startElem = currentPage * countElemOnPage - countElemOnPage;
        const endElem = currentPage * countElemOnPage;
        return filteredData.slice(startElem, endElem);
    }, [
        props.products,
        search,
        sortType,
        currentPage,
        countElemOnPage,
        filteredData,
    ]);

    return (
        <Container sx={{ py: 5 }} maxWidth="lg">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Button
                    color="inherit"
                    onClick={() => navigate(-1)}
                    startIcon={<ArrowBackIosNewIcon />}
                >
                    Back
                </Button>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label">
                        Sorting
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortType}
                        label="Sorting"
                        onChange={(e) =>
                            dispatch(changeSortType(e.target.value as TSort))
                        }
                    >
                        <MenuItem value="default">Default</MenuItem>
                        <MenuItem value="chp">First cheap</MenuItem>
                        <MenuItem value="exp">First expensive</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Grid container spacing={4}>
                {props.isLoading ? (
                    <CardLoadingSkeleton />
                ) : (
                    paginatedData.map((product: TProduct) => (
                        <Grid
                            item
                            key={product.id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                        >
                            <Card
                                sx={{
                                    height: "32rem",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: "15rem",
                                        objectFit: "contain",
                                    }}
                                    image={product.image}
                                />
                                <CardContent
                                    sx={{
                                        flexGrow: 1,
                                    }}
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                        sx={{
                                            textOverflow: "ellipsis",
                                            overflow: "hidden",
                                            WebkitLineClamp: "3",
                                            WebkitBoxOrient: "vertical",
                                            display: "-webkit-box",
                                        }}
                                    >
                                        {product.title}
                                    </Typography>
                                    <Typography gutterBottom>
                                        {product.price} $
                                    </Typography>
                                    <Rating
                                        value={product.rating.rate}
                                        precision={0.1}
                                        readOnly
                                    />
                                </CardContent>
                                <CardActions
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<SearchIcon />}
                                        onClick={() => {
                                            navigate(`/products/${product.id}`);
                                        }}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        startIcon={<AddShoppingCartIcon />}
                                        onClick={() => {
                                            if (token) {
                                                dispatch(
                                                    addProductToCart({
                                                        userId: id as number,
                                                        productId:
                                                            product.id as number,
                                                    }),
                                                );
                                                enqueueSnackbar(
                                                    `Product "${product?.title}" added to cart`,
                                                    {
                                                        variant: "success",
                                                        autoHideDuration: 3000,
                                                        anchorOrigin: {
                                                            horizontal: "right",
                                                            vertical: "bottom",
                                                        },
                                                    },
                                                );
                                            } else {
                                                enqueueSnackbar(
                                                    `Please login for adding products to cart`,
                                                    {
                                                        variant: "error",
                                                        autoHideDuration: 3000,
                                                        anchorOrigin: {
                                                            horizontal: "right",
                                                            vertical: "bottom",
                                                        },
                                                    },
                                                );
                                                navigate("/signin");
                                            }
                                        }}
                                    >
                                        Add to cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
            <Box
                sx={{
                    display: "flex",
                    // justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 3,
                }}
            >
                {paginatedData.length === 0 &&
                !props.isLoading &&
                props.isSuccess ? (
                    <Typography variant="h4">Not Found :(</Typography>
                ) : paginatedData.length !== 0 && props.isSuccess ? (
                    <>
                        <Stack spacing={2}>
                            <Pagination
                                count={getAllPages(filteredData)}
                                page={currentPage}
                                onChange={(e, value) => {
                                    setCurrentPage(value);
                                }}
                                color="primary"
                            />
                        </Stack>
                        <FormControl sx={{ width: 60, mt: 2 }}>
                            <Select
                                value={elementCountOnPage}
                                onChange={(e) => {
                                    dispatch(
                                        changeElementCountOnPage(
                                            e.target.value as number,
                                        ),
                                    );
                                    setCountElemOnPage(
                                        e.target.value as number,
                                    );
                                }}
                            >
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                ) : (
                    <Typography variant="h4">Error during loading(</Typography>
                )}
            </Box>
        </Container>
    );
}
