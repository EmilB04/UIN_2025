import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";

export default function Nav() {
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    const isActive = (path) => {
        return activePath === path || (activePath === '/' && path === '/html');
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