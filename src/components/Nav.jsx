import { Link } from "react-router";

export default function Nav() {
    return (
        <nav id="categories">
            <ul>
                <Link to={'/html'}>HTML</Link>
                <Link to={'/css'}>CSS</Link>
                <Link to={'/javascript'}>JavaScript</Link>
                <Link to={'/react'}>React</Link>
                <Link to={'/sanity'}>Sanity and headless CMS</Link>
            </ul>
        </nav>
    )
}