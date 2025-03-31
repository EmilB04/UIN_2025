import { useParams } from "react-router";
import Nav from "./NavSection";
import groupMembers from "../scripts/GroupMembers";
import "../styles/MemberStyle.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MemberPage() {
    const { slug } = useParams(); // Extract slug from URL params
    const navigate = useNavigate();
    const [member, setMember] = useState(null);

    useEffect(() => {
        const foundMember = groupMembers.find((m) => m.slug === slug);
        if (!foundMember) {
            navigate("/404");
        } else {
            setMember(foundMember);
        }
    }, [slug, navigate]);


    // TODO: Load info from Sanity. If not found, redirect to 404 page.
    // TODO: If some fields are empty, show a placeholder or default value.

    return (
        <div>
            <Nav />
            <section className="om-meg">
                <img
                    src="https://placehold.co/400x400"
                    alt={`Bilde av ${member?.name}`}
                />
                <section className="biografi">
                    <article>
                        <h1>{member?.name}</h1>
                        <p>Ad adipisicing occaecat enim anim.</p>
                    </article>
                    <article>
                        <h2>Interesser</h2>
                        <ul>
                            <li>Adipisicing</li>
                            <li>Laborum</li>
                            <li>Excepteur</li>
                            <li>Laboris</li>
                        </ul>
                    </article>
                </section>
            </section>
            <section className="arbeidslogg">
                <h2>Arbeidslogg</h2>
            </section>
        </div>
    );
}
