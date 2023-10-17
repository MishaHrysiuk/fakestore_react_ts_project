import { useParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../api/fakeStoreApi";
import ProductsList from "../components/ProductsList";

export default function ChoosenCategoryPage() {
    const { category } = useParams();
    const {
        data: products = [],
        isFetching,
        isSuccess,
    } = useGetProductsByCategoryQuery(category as string);

    return (
        <ProductsList
            isLoading={isFetching}
            isSuccess={isSuccess}
            products={products}
        />
    );
}
