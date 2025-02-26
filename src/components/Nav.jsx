import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";

export default function Nav() {
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    return (
        <nav id="categories">
            <ul>
                <Link className={`nav-li ${activePath === '/html' ? 'active' : ''}`} to={'/html'}>HTML</Link>
                <Link className={`nav-li ${activePath === '/css' ? 'active' : ''}`} to={'/css'}>CSS</Link>
                <Link className={`nav-li ${activePath === '/javascript' ? 'active' : ''}`} to={'/javascript'}>JavaScript</Link>
                <Link className={`nav-li ${activePath === '/react' ? 'active' : ''}`} to={'/react'}>React</Link>
                <Link className={`nav-li ${activePath === '/headless-cms' ? 'active' : ''}`} to={'/headless-cms'}>Sanity and headless CMS</Link>
            </ul>
        </nav>
    )
}