import React, { useState } from "react";
import "../styles/navStyle.scss";

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <nav id="nav">
            <span>
                <h1>Billettlyst</h1>
            </span>
            <ul id={menuOpen ? "open" : ""}>
                <li><a href="/">Home</a></li>
                <li><a href="/category">Category</a></li>
                <li><a href="/event">Event</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
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
