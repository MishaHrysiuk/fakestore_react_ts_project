import {
    Avatar,
    Dialog,
    DialogContent,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { useLazyGetUserByIdQuery } from "../api/fakeStoreApi";
import { useAppSelector } from "../store/hooks";
import { selectAuth } from "../store/authSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect } from "react";

interface ProfileModalProps {
    open: boolean;
    handleClose: () => void;
}

export default function ProfileModal({ open, handleClose }: ProfileModalProps) {
    const { id } = useAppSelector(selectAuth);

    const [getUser, { data: user }] = useLazyGetUserByIdQuery();

    useEffect(() => {
        if (id) {
            getUser(id).unwrap();
        }
    }, [id]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 5,
                }}
            >
                <Avatar sx={{ mb: 1, bgcolor: "primary.main" }}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5" gutterBottom>
                    User Information
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            name="firstName"
                            fullWidth
                            id="firstName"
                            label="First Name"
                            value={user?.name.firstname}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            value={user?.name.lastname}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            name="city"
                            fullWidth
                            id="city"
                            label="City"
                            value={user?.address.city}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            name="street"
                            fullWidth
                            id="street"
                            label="Street"
                            value={user?.address.street}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            name="number"
                            type="number"
                            fullWidth
                            error={false}
                            id="number"
                            label="Number"
                            value={user?.address.number}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            value={user?.username}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            type="tel"
                            id="phone"
                            label="Phone"
                            name="phone"
                            value={user?.phone}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={user?.email}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}
