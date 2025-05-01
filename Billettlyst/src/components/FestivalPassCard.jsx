export default function FestivalPassCard({ image, name, date, venue, onWishListClick }) {
    return (
        <article id="festivalPass">
            <img src={image} alt={`Bilde av ${name}`} />
            <h3>{name}</h3>
            <ul>
                <li>{venue}</li>  
                <li>{date}</li>
            </ul>
            <div id="festivalPassButtons">
                <button type="button">Kjøp</button>
                <button type="button" onClick={onWishListClick}>Legg til i ønskeliste</button> 
            </div>           
        </article>
    );
}