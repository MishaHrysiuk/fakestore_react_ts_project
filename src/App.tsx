import {
    CssBaseline,
    PaletteMode,
    ThemeProvider,
    createTheme,
} from "@mui/material";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "./components/Header";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { TProduct, useGetAllProductsQuery } from "./store/fakeStoreApi";
import useLocalStorage from "use-local-storage";

export default function App() {
    const { data: products = [] } = useGetAllProductsQuery({});
    const [theme, setTheme] = useLocalStorage<PaletteMode>("theme", "dark");

    const defaultTheme = createTheme({
        palette: {
            mode: theme,
        },
    });

    const switchTheme = () => {
        const newTheme: PaletteMode = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Header switchTheme={switchTheme} theme={theme} />
            <main>
                <Container sx={{ py: 8 }} maxWidth="lg">
                    <Grid container spacing={4}>
                        {products.map((product: TProduct) => (
                            <Grid item key={product.id} xs={12} sm={6} md={4}>
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
                                    <CardActions>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<SearchIcon />}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            startIcon={<ShoppingCartIcon />}
                                        >
                                            To cart
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}
