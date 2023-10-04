import { PaletteMode, createTheme } from "@mui/material";
import useLocalStorage from "use-local-storage";

export default function useThemeStyle() {
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

    return { theme, switchTheme, defaultTheme };
}
