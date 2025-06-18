import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ContentPage() {
    const { slug, content } = useParams();
    const [pageContent, setPageContent] = useState([]);
    const getContent = async () => {
        fetch(`https://zelda.fanapis.com/api/${slug}/${content}`)
            .then((response) => response.json())
            .then((data) => setPageContent(data.data))
            .catch((error) =>
                console.error("Noe feil skjedde ved henting av data fra API", error
                )
            );
    };
    useEffect(() => {
        getContent();
    }
        , [content]);
    console.log("slug", slug, "content", content);
    return (
        <>
            <h1>{pageContent?.name}</h1>
            <section>
                {pageContent?.description ? (
                    <>
                        <h2>Inhabitants</h2>
                        <ul>
                            {pageContent?.inhabitants?.map((person, index) =>
                                <li key={person.id || index}>{person.name}</li>)}
                        </ul>
                    </>
                ) : null}
            </section>
        </>
    )
}
