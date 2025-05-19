export default function ArtistCard({ name, image }) {
    return (
        <article className="artist-card">
            <img src={image} alt={`Bilde av ${name}`} />
            <h3>{name}</h3>
        </article>
    )
}