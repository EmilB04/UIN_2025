export default function CategoryButtons({ category, getProductsByCategory }) {
  return (
    <button onClick={() => getProductsByCategory(category.categoryname)}>
      {category.categoryname}
    </button>
  );
}
