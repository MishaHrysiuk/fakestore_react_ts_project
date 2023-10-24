import { useState } from "react";

export default function useMenuDisplay() {
    const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    return { anchorElMenu, handleOpenMenu, handleCloseMenu };
}
