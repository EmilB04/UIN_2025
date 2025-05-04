import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategoryBySlug } from "../sanity/categoryServices";

export default function CategoryPage() {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategoryBySlug(slug)
            .then((data) => {
                if (data.length > 0) {
                    setCategory(data[0]);  // Sett kategorien hvis den finnes
                } else {
                    // Hvis kategorien ikke finnes, naviger til "PageNotFound"
                    navigate("/page-not-found");
                }
            })
            .catch((error) => {
                console.error("Feil ved henting av kategori:", error);
                navigate("/page-not-found");  // Naviger til "PageNotFound" ved feil
            });
    }, [slug, navigate]);

    if (!category) return null;  // Ikke vis noe hvis ikke kategorien er lastet

    return (
        <div>
            <h1>{category.categoryname}</h1>
            {/* TODO: Hent og vis events for denne kategorien */}
        </div>
    );
}
