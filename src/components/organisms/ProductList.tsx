import { Loading } from "@/components/templetes/common/Loading";
import { useProducts } from "@/hooks/useProduct";
import { Fragment } from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/product";

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
            headline={product.headline}
            recruit={product.recruit!}
          />
        ))}
      </div>
    </>
  );
};
