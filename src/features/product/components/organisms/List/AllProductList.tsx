import { Loading } from "@/components/organisms/Loading/Loading";
import { useProducts } from "@/features/product/hooks/useProducts";
import { Fragment } from "react";
import { ProductCard } from "../Card/ProductCard";
import { Product } from "@/features/product/types/product";

export const ProductList = () => {
  const { products } = useProducts();

  if (!products) return <Loading />;

  return (
    <>
      <div className="flex justify-start font-bold text-2xl mx-20 mt-5">成果物一覧</div>
      <div className="grid mx-10 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            recruit={product.recruit!}
          />
        ))}
      </div>
    </>
  );
};
