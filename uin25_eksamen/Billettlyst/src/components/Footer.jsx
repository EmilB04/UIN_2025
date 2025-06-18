import "../styles/footerStyle.scss"

export default function Footer() {
    return (
        <footer id='footer'>
            {/*https://elementor.com/blog/noopener-noreferrer/ */}
            <p>Data er hentet fra&nbsp;
                <a href="https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/" target="_blank" rel="noopener noreferrer">
                    Ticketmaster API
                </a>
            </p>
            <p>2025 BillettLyst - Gruppe 2</p>
        </footer>
    );
}