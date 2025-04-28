import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navStyle.scss";

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") === "true") {
            setIsLoggedIn(true);
        }
    }, []);


    return (
        <nav id="nav">
            <Link to="/" id="title" onClick={() => setMenuOpen(false)}>BillettLyst</Link>
            <ul id="nav-links" className={menuOpen ? "open" : ""} onClick={() => setMenuOpen(false)}>
                <li><Link to="/category:slug">Musikk</Link></li>
                <li><Link to="/category:slug">Sport</Link></li>
                <li><Link to="/category:slug">Teater/Show</Link></li>
                <li>
                    {isLoggedIn ? (
                        <Link to="/dashboard">Min side</Link>
                    ) : (
                        <Link to="/dashboard">Logg inn</Link>
                    )}
                </li>
            </ul>
            <search id="search-container" className={searchOpen ? "open" : ""}>
                <div id="search-box">
                    <input type="text" placeholder="Søk etter innhold" />
                    <button type="submit">Søk</button>
                </div>
                <button id="search-icon" onClick={() => setSearchOpen(!searchOpen)} aria-label="Toggle search">
                    <i className="fas fa-search"></i>
                </button>
            </search>
            <button id="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </button>
        </nav>
    );
}


/* Sources: 
    Font Awesome: https://fontawesome.com/icons

*/
