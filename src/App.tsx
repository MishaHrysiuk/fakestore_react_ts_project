import { CssBaseline, ThemeProvider } from "@mui/material";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import useThemeStyle from "./hooks/useThemeStyle";
import MainPage from "./pages/MainPage";
import ChoosenCategoryPage from "./pages/ChoosenCategoryPage";
import { SnackbarProvider } from "notistack";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

export default function App() {
    const { theme, switchTheme, defaultTheme } = useThemeStyle();

    return (
        <Router>
            <ThemeProvider theme={defaultTheme}>
                <SnackbarProvider maxSnack={3}>
                    <CssBaseline />
                    <Header switchTheme={switchTheme} theme={theme} />
                    <main>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route
                                path="category/:category"
                                element={<ChoosenCategoryPage />}
                            />
                            <Route
                                path="products/:productId"
                                element={<SingleProductPage />}
                            />
                            <Route path="signup" element={<SignUpPage />} />
                            <Route path="signin" element={<SignInPage />} />
                            <Route
                                path="*"
                                element={<Navigate to="/" replace={true} />}
                            />
                            <Route path="cart" element={<CartPage />} />
                        </Routes>
                    </main>
                </SnackbarProvider>
            </ThemeProvider>
        </Router>
    );
}
