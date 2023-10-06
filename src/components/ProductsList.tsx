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
    Select,
    Typography,
} from "@mui/material";
import CardLoadingSkeleton from "../components/CardLoadingSkeleton";
import { TProduct } from "../api/fakeStoreApi";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import useFiltering from "../hooks/useFiltering";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { TSort, changeSortType } from "../store/searchSlice";

export default function ProductsList(props: {
    isLoading: boolean;
    products: TProduct[];
}) {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const search = useSelector((state: RootState) => state.search.search);
    const sortType = useSelector((state: RootState) => state.search.sortType);
    const dispatch = useDispatch();

    const { searchProduct, sortingProducts } = useFiltering();

    const filteredData = useMemo(() => {
        return sortingProducts(searchProduct(props.products, search), sortType);
        // eslint-disable-next-line
    }, [props.products, search, sortType]);

    return (
        <Container sx={{ py: 5 }} maxWidth="lg">
            <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
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
                        <MenuItem value="norm">Normal</MenuItem>
                        <MenuItem value="chp">First cheap</MenuItem>
                        <MenuItem value="exp">First expensive</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Grid container spacing={4}>
                {props.isLoading ? (
                    <CardLoadingSkeleton />
                ) : (
                    filteredData.map((product: TProduct) => (
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
                                    height: "100%",
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
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                    >
                                        {product.title}
                                    </Typography>
                                    <Typography>{product.price} $</Typography>
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
                                        startIcon={<ShoppingCartIcon />}
                                        onClick={() =>
                                            enqueueSnackbar(
                                                `Product №${product.id} added to cart`,
                                                {
                                                    variant: "success",
                                                    autoHideDuration: 3000,
                                                    anchorOrigin: {
                                                        horizontal: "right",
                                                        vertical: "bottom",
                                                    },
                                                }
                                            )
                                        }
                                    >
                                        Add to cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
}
