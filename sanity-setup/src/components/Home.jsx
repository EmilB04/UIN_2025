import CategoryButtons from "./CategoryButtons";
import ProductCard from "./ProductCard";

export default function Home({ categories, products, getProductsByCategory }) {
  return (
    <>
      <h1>Min nettbutikk</h1>
      {categories?.map((category) => (
        <CategoryButtons
          category={category}
          key={category._id}
          getProductsByCategory={getProductsByCategory}
        />
      ))}
      {products?.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </>
  );
}
