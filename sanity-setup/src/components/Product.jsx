import { useParams } from "react-router-dom";
import { fetchProductBySlug } from "../sanity/productsServices";
import { useEffect, useState } from "react";

export default function Product() {
  const { product } = useParams();
  const [productInfo, setProductInfo] = useState([]);
  console.log(product);

  const getProductBySlug = async (product) => {
    const data = await fetchProductBySlug(product);
    setProductInfo(data);
  };


  useEffect(() => {
    getProductBySlug(product);
  }, [product]);

  return <h1>{productInfo[0]?.productname}</h1>;
}
