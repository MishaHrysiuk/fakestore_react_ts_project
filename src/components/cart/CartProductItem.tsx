import { Box, IconButton, TableCell, TableRow, TextField } from "@mui/material";
import { TProductCart, useGetProductByIdQuery } from "../../api/fakeStoreApi";
import { useMemo } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
export default function CartProductItem({
    product,
}: {
    product: TProductCart;
}) {
    const { data: productInfo, isLoading } = useGetProductByIdQuery(
        product.productId
    );

    const priceSum = useMemo(() => {
        return product.quantity * (productInfo ? productInfo.price : 0);
    }, [product, productInfo]);

    return (
        <>
            <TableRow
                sx={{
                    "&:nth-last-of-type(2) td, &:nth-last-of-type(2) th": {
                        border: 0,
                    },
                    "& td, & th": {
                        borderBottomWidth: {
                            xs: 0,
                            sm: 1,
                        },
                    },
                }}
            >
                <TableCell padding="none" width={100} align="center">
                    <Box
                        component="img"
                        sx={{
                            height: 100,
                            maxWidth: 80,
                            m: 1,
                            mb: 0.7,
                            objectFit: "contain",
                        }}
                        alt={productInfo?.title}
                        src={productInfo?.image}
                    />
                </TableCell>
                <TableCell>
                    <Box
                        sx={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            WebkitLineClamp: "3",
                            WebkitBoxOrient: "vertical",
                            display: "-webkit-box",
                        }}
                    >
                        {productInfo?.title}
                    </Box>
                </TableCell>
                <TableCell width={100}>{priceSum} $ </TableCell>
                <TableCell
                    width={180}
                    align="center"
                    sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                    <IconButton size="large" color="error">
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <TextField
                        InputProps={{
                            readOnly: true,
                            style: { textAlignLast: "center" },
                            rows: 1,
                        }}
                        value={product.quantity}
                        size="small"
                        sx={{ width: 50, mt: 0.5 }}
                    />
                    <IconButton size="large" color="success">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow
                sx={{
                    "&:last-child td, &:last-child th": {
                        border: 0,
                    },
                    display: { xs: "table-row", sm: "none" },
                }}
            >
                <TableCell
                    component="th"
                    sx={{
                        display: { xs: "table-cell", sm: "none" },
                    }}
                    colSpan={3}
                    align="center"
                >
                    <IconButton size="large" color="error">
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <TextField
                        InputProps={{
                            readOnly: true,
                            style: { textAlignLast: "center" },
                            rows: 1,
                        }}
                        value={product.quantity}
                        size="small"
                        sx={{ width: 50, mt: 0.5 }}
                    />
                    <IconButton size="large" color="success">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
}
