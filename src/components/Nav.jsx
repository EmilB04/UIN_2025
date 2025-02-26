/* eslint-disable react/prop-types */
import { Link } from "react-router";

export default function Nav({ activeCategory }) {
    const isActive = (path) => {
        // Check if the current path is the same as the path in the argument
        // If the current path is the root path, check if the argument is '/html'
        // This is to make sure that the 'HTML' category is active when the root path is active
        return activeCategory === path || (activeCategory === '/' && path === '/html');
    };

    return (
        <nav id="categories">
            <ul>
                <Link className={`nav-li ${isActive('/html') ? 'active' : ''}`} to={'/html'}>HTML</Link>
                <Link className={`nav-li ${isActive('/css') ? 'active' : ''}`} to={'/css'}>CSS</Link>
                <Link className={`nav-li ${isActive('/javascript') ? 'active' : ''}`} to={'/javascript'}>JavaScript</Link>
                <Link className={`nav-li ${isActive('/react') ? 'active' : ''}`} to={'/react'}>React</Link>
                <Link className={`nav-li ${isActive('/headless-cms') ? 'active' : ''}`} to={'/headless-cms'}>Sanity and headless CMS</Link>
            </ul>
        </nav>
    )
}