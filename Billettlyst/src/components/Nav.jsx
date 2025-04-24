import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navStyle.scss";

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <nav id="nav">
            <span>
                <h1>Billettlyst</h1>
            </span>
            <ul class={menuOpen ? "open" : ""} id="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/category">Category</Link></li>
                <li><Link to="/event">Event</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
            <search id="search-container">
                {searchOpen && (
                    <div id="search-box">
                        <input type="text" placeholder="Search..." />
                        <button type="submit">Search</button>
                    </div>
                )}
                <button
                    id="search-icon"
                    onClick={() => setSearchOpen(!searchOpen)}
                    aria-label="Toggle search"
                >
                    <i className="fas fa-search"></i>
                </button>
            </search>
            <button
                id="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </button>
        </nav>
    );
}
