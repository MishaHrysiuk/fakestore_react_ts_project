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
            {cart.products.length ? (
                <>
                    <Typography variant="h5" align="center">
                        Cart id: {cart.id}
                    </Typography>
                    <Typography variant="h6" align="center">
                        Creation date:{" "}
                        {new Date(cart.date).toJSON().slice(0, 10)}
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
            ) : (
                <Typography variant="h4" align="center">
                    Cart is empty
                </Typography>
            )}
        </>
    );
}
