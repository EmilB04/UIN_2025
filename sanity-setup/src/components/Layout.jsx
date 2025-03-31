import { Children } from "react";
import { Link } from "react-router-dom";

export default function Layout () {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="products">Products</Link>
                        </li>
                        <li>
                            <Link to="category">Category</Link>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                {Children}
            </main>
        </>
    )
}