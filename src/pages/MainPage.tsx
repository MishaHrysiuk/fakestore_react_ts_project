import { useGetAllProductsQuery } from "../api/fakeStoreApi";
import ProductsList from "../components/ProductsList";

export default function MainPage() {
    const {
        data: products = [],
        isLoading,
        isSuccess,
    } = useGetAllProductsQuery();

    return (
        <>
            <ProductsList
                isLoading={isLoading}
                isSuccess={isSuccess}
                products={products}
            />
        </>
    );
}
