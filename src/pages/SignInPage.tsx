import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../api/fakeStoreApi";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/authSlice";
import jwtDecode from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";

export type TUserToken = {
    sub: number;
    token: string;
};

export default function SignIn() {
    const [formValue, setFormValue] = useState<{
        username: string;
        password: string;
    }>({ username: "", password: "" });

    const { username, password } = formValue;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [
        loginUser,
        {
            data: loginData = { token: "" },
            isSuccess: isLoginSuccess,
            isError: isLoginError,
            isLoading: isLoginLoading,
        },
    ] = useLoginUserMutation();

    useEffect(() => {
        if (isLoginSuccess) {
            dispatch(
                setUser({
                    id: (jwtDecode(loginData.token) as TUserToken).sub,
                    token: loginData.token,
                }),
            );
            enqueueSnackbar("User Login Succesfully", {
                variant: "success",
                autoHideDuration: 3000,
                anchorOrigin: {
                    horizontal: "right",
                    vertical: "bottom",
                },
            });
            navigate("/");
        }
        if (isLoginError) {
            enqueueSnackbar("Username or password is incorrect", {
                variant: "error",
                autoHideDuration: 3000,
                anchorOrigin: {
                    horizontal: "right",
                    vertical: "bottom",
                },
            });
        }
    }, [isLoginSuccess, isLoginError, dispatch, loginData?.token, navigate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue({ ...formValue, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username && password) {
            await loginUser({ username, password });
        } else {
            enqueueSnackbar("Dont fill inputs", {
                variant: "error",
                autoHideDuration: 3000,
                anchorOrigin: {
                    horizontal: "right",
                    vertical: "bottom",
                },
            });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        loading={isLoginLoading}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </LoadingButton>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                sx={{
                                    cursor: "pointer",
                                }}
                                onClick={() => navigate("/signup")}
                                variant="body2"
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
