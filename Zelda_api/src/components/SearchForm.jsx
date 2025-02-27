/* eslint-disable react/prop-types */
import "../assets/styles/searchComp.scss";

export default function SearchForm({ setSearch, handleClick }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleClick();
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">Her kan du søke etter spill</label>
            <input type="search" id="search" onChange={handleChange} />
            <button type="submit">Søk etter spill</button>
        </form>
    );
}