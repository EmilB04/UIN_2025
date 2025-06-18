/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CategoryCard from "./CategoryCard";

export default function CategoryPage() {
    const { slug } = useParams();
    const [result, setResult] = useState();
    const getData = async () => {
        fetch(`https://zelda.fanapis.com/api/${slug}`)
        .then(response => response.json())
        .then(data => setResult(data.data))
        .catch(error => console.error("Error under fetching av data", error))
    }
    useEffect(() => {
        getData();
    }, [slug])
    return (
        <div>
            <h1>{slug}</h1>
            <section className="flex-section">
                {result?.map(item =>
                    <CategoryCard item={item} key={item.id} />
                )}
            </section>
        </div>
    )
}