import { PaletteMode, createTheme } from "@mui/material";
import useLocalStorage from "use-local-storage";

export default function useThemeStyle() {
    const [theme, setTheme] = useLocalStorage<PaletteMode>("theme", "dark");

    const defaultTheme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 450,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
        },
        palette: {
            mode: theme,
        },
    });

    const switchTheme = () => {
        const newTheme: PaletteMode = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return { theme, switchTheme, defaultTheme };
}
