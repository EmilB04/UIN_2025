/* eslint-disable react/prop-types */
import { Link } from "react-router";

export default function Layout({ children }) {
    return (
        <>
        <header>
            <nav>
                <Link to={'/'}>Home</Link>
                <Link to={'bosses'}>Bosses</Link>
                <Link to={'characters'}>Characters</Link>
                <Link to={'items'}>Items</Link>
                <Link to={'places'}>Places</Link>
            </nav>
        </header>
        {children}
        <footer>
            <p>@Zelda API forelesning 2025</p>
        </footer>
        </>
    )
}