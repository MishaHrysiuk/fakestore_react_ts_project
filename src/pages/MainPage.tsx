import { useGetAllProductsQuery } from "../api/fakeStoreApi";
import ProductsList from "../components/ProductsList";

export default function MainPage() {
    const { data: products = [], isLoading } = useGetAllProductsQuery({});

    return (
        <>
            <ProductsList isLoading={isLoading} products={products} />
        </>
    );
}