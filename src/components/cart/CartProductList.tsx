import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    Typography,
} from "@mui/material";
import CartProductItem from "./CartProductItem";
import { TCart, TProductCart } from "../../api/fakeStoreApi";

export default function CartProductList({ cart }: { cart: TCart }) {
    return (
        <>
            <Typography variant="h5" align="center">
                Cart id: {cart.id}
            </Typography>
            <Typography variant="h6" align="center">
                Created: {new Date(cart.date).toJSON().slice(0, 10)}
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table aria-label="simple table">
                    <TableBody>
                        {cart.products.map((product: TProductCart) => (
                            <CartProductItem
                                key={product.productId}
                                product={product}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
