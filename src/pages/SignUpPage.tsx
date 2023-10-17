import * as React from "react";
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
import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import {
    useAddNewUserMutation,
    useLoginUserMutation,
} from "../api/fakeStoreApi";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";
import jwtDecode from "jwt-decode";
import { setUser } from "../store/authSlice";

export default function SignUp() {
    const [formValue, setFormValue] = useState<{
        firstName: string;
        lastName: string;
        city: string;
        street: string;
        number: number;
        username: string;
        phone: string;
        email: string;
        password: string;
        lat: number;
        long: number;
    }>({
        firstName: "",
        lastName: "",
        city: "",
        street: "",
        number: 0,
        username: "",
        phone: "",
        email: "",
        password: "",
        lat: 0,
        long: 0,
    });

    const {
        firstName,
        lastName,
        city,
        street,
        number,
        username,
        phone,
        email,
        password,
        lat,
        long,
    } = formValue;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [createUser, { isSuccess, isError, isLoading }] =
        useAddNewUserMutation();

    const [loginUser, { data: loginData, isSuccess: isLoginSuccess }] =
        useLoginUserMutation();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setFormValue({
                ...formValue,
                lat: pos.coords.latitude,
                long: pos.coords.longitude,
            });
        });
    });

    useEffect(() => {
        const login = async () => {
            await loginUser({
                username: "mor_2314",
                password: "83r5^_",
            });

            if (isSuccess && isLoginSuccess) {
                dispatch(
                    setUser({
                        id: (jwtDecode(loginData?.token as string) as any).sub,
                        token: loginData?.token as string,
                    })
                );
                enqueueSnackbar("User Register Login Succesfully", {
                    variant: "success",
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        horizontal: "right",
                        vertical: "bottom",
                    },
                });
                navigate("/");
            }
            if (isError) {
                enqueueSnackbar("We cant register this user", {
                    variant: "error",
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        horizontal: "right",
                        vertical: "bottom",
                    },
                });
            }
        };
        login();
    }, [
        isSuccess,
        isError,
        dispatch,
        isLoginSuccess,
        loginData?.token,
        loginUser,
        navigate,
    ]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue({ ...formValue, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username && password) {
            await createUser({
                email,
                username,
                password,
                phone,
                name: { firstname: firstName, lastname: lastName },
                address: {
                    city,
                    street,
                    number,
                    geolocation: {
                        lat,
                        long,
                    },
                    zipcode: "44801",
                },
            });
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
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                onChange={handleChange}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="city"
                                required
                                fullWidth
                                id="city"
                                label="City"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="street"
                                required
                                fullWidth
                                id="street"
                                label="Street"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="number"
                                type="number"
                                required
                                fullWidth
                                error={false}
                                id="number"
                                label="Number"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="tel"
                                id="phone"
                                label="Phone"
                                name="phone"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handleChange}
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        loading={isLoading}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </LoadingButton>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                sx={{
                                    cursor: "pointer",
                                }}
                                onClick={() => navigate("/signin")}
                                variant="body2"
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
