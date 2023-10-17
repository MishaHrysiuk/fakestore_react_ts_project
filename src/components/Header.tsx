import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useGetAllCategoriesQuery } from "../api/fakeStoreApi";
import MaterialUISwitch from "./ThemeSwitch";
import { Link, PaletteMode, Tab, Tabs } from "@mui/material";

import { useNavigate, useMatch } from "react-router-dom";

import { changeSearch, clearSearch, selectSearch } from "../store/searchSlice";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchInput";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout, selectAuth } from "../store/authSlice";
import { enqueueSnackbar } from "notistack";

const settings = [{ label: "Cart", link: "/cart" }];

interface ThemeProps {
    switchTheme: () => void;
    theme: PaletteMode;
}

function Header(props: ThemeProps) {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const { data: categories = [] } = useGetAllCategoriesQuery();

    const navigate = useNavigate();
    const match = useMatch("category/:category");

    const { search } = useAppSelector(selectSearch);
    const { token } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
        dispatch(clearSearch());
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ShoppingBagIcon
                        sx={{ display: { xs: "none", lg: "flex" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={() => {
                            navigate("/");
                            handleCloseNavMenu();
                        }}
                        sx={{
                            mr: 2,
                            display: { xs: "none", lg: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                            cursor: "pointer",
                        }}
                    >
                        FakeStore
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 0,
                            display: { xs: "flex", lg: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="false"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", lg: "none" },
                            }}
                        >
                            {categories.map((category: string) => {
                                return (
                                    <MenuItem
                                        key={category}
                                        onClick={() => {
                                            navigate(`category/${category}`);
                                            handleCloseNavMenu();
                                        }}
                                        sx={{
                                            color: "inherit",
                                        }}
                                        selected={
                                            match?.params.category === category
                                                ? true
                                                : false
                                        }
                                    >
                                        <Typography textAlign="center">
                                            {category.charAt(0).toUpperCase() +
                                                category.slice(1)}
                                        </Typography>
                                    </MenuItem>
                                );
                            })}
                        </Menu>
                    </Box>
                    <ShoppingBagIcon
                        sx={{ display: { xs: "flex", lg: "none" }, mr: 1 }}
                    />

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={() => {
                            navigate("/");
                            handleCloseNavMenu();
                        }}
                        sx={{
                            mr: 2,
                            flexGrow: 1,
                            display: { xs: "flex", lg: "none" },
                            fontFamily: "monospace",
                            justifySelf: "flex-start",
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                            cursor: "pointer",
                        }}
                    >
                        FakeStore
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", lg: "flex" },
                        }}
                    >
                        <Tabs
                            textColor="secondary"
                            indicatorColor="secondary"
                            value={match ? match.params.category : false}
                        >
                            {categories.map((category: string) => (
                                <Tab
                                    onClick={() => {
                                        navigate(`category/${category}`);
                                        handleCloseNavMenu();
                                    }}
                                    value={category}
                                    label={
                                        category.charAt(0).toUpperCase() +
                                        category.slice(1)
                                    }
                                    key={category}
                                    sx={{
                                        color: "inherit",
                                    }}
                                />
                            ))}
                        </Tabs>
                    </Box>

                    <Search
                        sx={{
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                            value={search}
                            onChange={(e) =>
                                dispatch(changeSearch(e.target.value))
                            }
                        />
                    </Search>

                    <MaterialUISwitch
                        onChange={props.switchTheme}
                        checked={props.theme === "dark"}
                        sx={{
                            display: { xs: "none", sm: "flex" },
                        }}
                    />

                    {!token ? (
                        <Link
                            underline="none"
                            color="inherit"
                            onClick={() => navigate("/signin")}
                            sx={{ cursor: "pointer", mx: 2 }}
                        >
                            Login
                        </Link>
                    ) : (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    color="inherit"
                                >
                                    <AccountCircleIcon
                                        sx={{ fontSize: "2.5rem" }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting.label}
                                        onClick={() => {
                                            navigate(setting.link);
                                            handleCloseUserMenu();
                                        }}
                                    >
                                        <Typography textAlign="center">
                                            {setting.label}
                                        </Typography>
                                    </MenuItem>
                                ))}
                                {!token ? null : (
                                    <MenuItem
                                        onClick={() => {
                                            navigate("/signin");
                                            handleCloseUserMenu();
                                            dispatch(logout());
                                            enqueueSnackbar(
                                                "User Logout Succesfully",
                                                {
                                                    variant: "info",
                                                    autoHideDuration: 3000,
                                                    anchorOrigin: {
                                                        horizontal: "right",
                                                        vertical: "bottom",
                                                    },
                                                }
                                            );
                                        }}
                                    >
                                        <Typography textAlign="center">
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                )}
                                <Search
                                    sx={{
                                        display: { xs: "block", sm: "none" },
                                    }}
                                >
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ "aria-label": "search" }}
                                        value={search}
                                        onChange={(e) =>
                                            dispatch(
                                                changeSearch(e.target.value)
                                            )
                                        }
                                    />
                                </Search>

                                <MaterialUISwitch
                                    onChange={props.switchTheme}
                                    checked={props.theme === "dark"}
                                    sx={{
                                        display: { xs: "flex", sm: "none" },
                                    }}
                                />
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
