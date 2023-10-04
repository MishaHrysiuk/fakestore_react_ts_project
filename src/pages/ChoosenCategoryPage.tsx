import { useParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../store/fakeStoreApi";
import ProductsList from "../components/ProductsList";

export default function ChoosenCategoryPage() {
    const { category } = useParams();
    const { data: products = [], isFetching } = useGetProductsByCategoryQuery(
        category as string
    );

    return <ProductsList isLoading={isFetching} products={products} />;
}
