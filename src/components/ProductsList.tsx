import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import CardLoadingSkeleton from "../components/CardLoadingSkeleton";
import { TProduct } from "../store/fakeStoreApi";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function ProductsList(props: {
    isLoading: boolean;
    products: TProduct[];
}) {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    return (
        <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={4}>
                {props.isLoading ? (
                    <CardLoadingSkeleton />
                ) : (
                    props.products.map((product: TProduct) => (
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
                                    <Typography>
                                        {product.category
                                            .charAt(0)
                                            .toUpperCase() +
                                            product.category.slice(1)}
                                    </Typography>
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
