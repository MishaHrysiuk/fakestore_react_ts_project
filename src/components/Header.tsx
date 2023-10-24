import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useGetAllCategoriesQuery } from "../api/fakeStoreApi";
import MaterialUISwitch from "./ThemeSwitch";
import {
    Divider,
    Link,
    ListItemIcon,
    PaletteMode,
    Tab,
    Tabs,
} from "@mui/material";

import { useNavigate, useMatch, useLocation } from "react-router-dom";

import { changeSearch, selectSearch } from "../store/searchSlice";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchInput";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout, selectAuth } from "../store/authSlice";
import { enqueueSnackbar } from "notistack";
import { Logout } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import useMenuDisplay from "../hooks/useMenuDisplay";
import { useState } from "react";
import ProfileModal from "./ProfileModal";

interface ThemeProps {
    switchTheme: () => void;
    theme: PaletteMode;
}

function Header(props: ThemeProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {
        anchorElMenu: anchorElNav,
        handleCloseMenu: handleCloseNavMenu,
        handleOpenMenu: handleOpenNavMenu,
    } = useMenuDisplay();

    const {
        anchorElMenu: anchorElUser,
        handleCloseMenu: handleCloseUserMenu,
        handleOpenMenu: handleOpenUserMenu,
    } = useMenuDisplay();

    const { data: categories = [] } = useGetAllCategoriesQuery();

    const navigate = useNavigate();
    const match = useMatch("category/:category");
    const location = useLocation();

    const { search } = useAppSelector(selectSearch);
    const { token } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ProfileModal open={open} handleClose={handleClose} />
                    <Menu
                        sx={{ mt: "45px" }}
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
                        <MenuItem
                            onClick={handleOpenNavMenu}
                            sx={{ display: { xs: "flex", md: "none" } }}
                            selected={location.pathname.includes("/category")}
                        >
                            <ListItemIcon>
                                <CategoryIcon fontSize="small" />
                            </ListItemIcon>
                            Categories
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                navigate("/cart");
                                handleCloseUserMenu();
                            }}
                            sx={{ display: { xs: "flex", md: "none" } }}
                            selected={location.pathname.includes("/cart")}
                        >
                            <ListItemIcon>
                                <ShoppingCartIcon fontSize="small" />
                            </ListItemIcon>
                            Cart
                        </MenuItem>
                        <Divider sx={{ display: { xs: "flex", md: "none" } }} />
                        {!token ? null : (
                            <MenuItem
                                onClick={() => {
                                    handleCloseUserMenu();
                                    handleOpen();
                                }}
                            >
                                <ListItemIcon>
                                    <ManageAccountsIcon fontSize="small" />
                                </ListItemIcon>
                                Profile
                            </MenuItem>
                        )}
                        {!token ? null : (
                            <MenuItem
                                onClick={() => {
                                    navigate("/signin");
                                    handleCloseUserMenu();
                                    dispatch(logout());
                                    enqueueSnackbar("User Logout Succesfully", {
                                        variant: "info",
                                        autoHideDuration: 3000,
                                        anchorOrigin: {
                                            horizontal: "right",
                                            vertical: "bottom",
                                        },
                                    });
                                }}
                            >
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        )}

                        <Divider sx={{ display: { xs: "flex", sm: "none" } }} />

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
                                    dispatch(changeSearch(e.target.value))
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
                    <Menu
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
                    >
                        {categories.map((category: string) => {
                            return (
                                <MenuItem
                                    key={category}
                                    onClick={() => {
                                        navigate(`category/${category}`);
                                        handleCloseNavMenu();
                                        handleCloseUserMenu();
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
                    <ShoppingBagIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
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
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                            cursor: "pointer",
                        }}
                    >
                        FakeStore
                    </Typography>

                    <ShoppingBagIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
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
                            display: { xs: "flex", md: "none" },
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
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Tabs
                            textColor="secondary"
                            indicatorColor="secondary"
                            value={
                                location.pathname === "/cart"
                                    ? "cart"
                                    : location.pathname.includes("/category")
                                    ? "category"
                                    : false
                            }
                        >
                            <Tab
                                onClick={handleOpenNavMenu}
                                value="category"
                                iconPosition="start"
                                icon={<CategoryIcon fontSize="small" />}
                                label="Categories"
                                sx={{
                                    color: "inherit",
                                }}
                            />
                            <Tab
                                onClick={() => {
                                    navigate("/cart");
                                }}
                                value="cart"
                                iconPosition="start"
                                icon={<ShoppingCartIcon fontSize="small" />}
                                label="Cart"
                                sx={{
                                    color: "inherit",
                                }}
                            />
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
                                        sx={{
                                            fontSize: "2.5rem",
                                            display: {
                                                xs: "none",
                                                md: "flex",
                                            },
                                        }}
                                    />
                                    <MenuIcon
                                        sx={{
                                            display: {
                                                xs: "block",
                                                md: "none",
                                            },
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
