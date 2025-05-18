import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/footerStyle.scss"

export default function Footer() {
    return (
        <footer id='footer'>
            <p>Data er hentet fra&nbsp;
                <a href="https://developer.ticketmaster.com/" target="_blank" rel="noopener noreferrer"> {/*https://elementor.com/blog/noopener-noreferrer/ */}
                    Ticketmaster API
                </a>
            </p>
            <p>2025 BillettLyst - Gruppe 2</p>
        </footer>
    );
}