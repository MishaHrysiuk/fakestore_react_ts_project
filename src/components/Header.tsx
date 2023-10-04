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
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useGetAllCategoriesQuery } from "../store/fakeStoreApi";
import MaterialUISwitch from "./ThemeSwitch";
import { PaletteMode, Tab, Tabs } from "@mui/material";

import { useNavigate, useMatch } from "react-router-dom";

const settings = ["Profile", "Dashboard", "Logout"];

interface ThemeProps {
    switchTheme?: () => void;
    theme?: PaletteMode;
}

function Header(props: ThemeProps) {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { data: categories = [] } = useGetAllCategoriesQuery({});
    const navigate = useNavigate();
    const match = useMatch("category/:category");

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="sticky" color="default">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
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

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
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
                                display: { xs: "block", md: "none" },
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
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
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
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Tabs
                            textColor="secondary"
                            indicatorColor="secondary"
                            value={match?.params.category}
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
                                    key={setting}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                            <MaterialUISwitch
                                onChange={props.switchTheme}
                                checked={props.theme === "dark"}
                            />
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
