import Nav from "./NavSection";
import "../styles/MemberStyle.scss";

export default function MemberPage({ member }) {
    return (
        <div>
            <Nav />
            <section className="om-meg">
                <img
                    src="https://placehold.co/400x400"
                    alt={`Bilde av ${member.name}`}
                />
                <section className="biografi">
                    <article>
                        <h1>{member.name}</h1>
                        <p>{member.email}</p>
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