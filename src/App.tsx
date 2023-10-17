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
import { useAppDispatch } from "./store/hooks";
import { selectAuth, setUser } from "./store/authSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function App() {
    const { theme, switchTheme, defaultTheme } = useThemeStyle();
    const dispatch = useAppDispatch();
    const { token } = useSelector(selectAuth);
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        dispatch(setUser(user));
    });

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
                            <Route
                                path="signup"
                                element={
                                    token ? (
                                        <Navigate to="/" replace={true} />
                                    ) : (
                                        <SignUpPage />
                                    )
                                }
                            />
                            <Route
                                path="signin"
                                element={
                                    token ? (
                                        <Navigate to="/" replace={true} />
                                    ) : (
                                        <SignInPage />
                                    )
                                }
                            />
                            <Route
                                path="*"
                                element={<Navigate to="/" replace={true} />}
                            />
                            <Route
                                path="cart"
                                element={
                                    token ? (
                                        <CartPage />
                                    ) : (
                                        <Navigate to="/signin" replace={true} />
                                    )
                                }
                            />
                        </Routes>
                    </main>
                </SnackbarProvider>
            </ThemeProvider>
        </Router>
    );
}
