import "../styles/LayoutStyle.scss";
import { useLocation, useParams } from "react-router";
import Nav from "./Nav";
import Resources from "./Resources";

export default function Layout() {
    const { category } = useParams();
    const location = useLocation();
    const currentCategory = category || "html"; // Default to "html" if no category is provided
    const activeCategory = location.pathname; // Get the current path, etc: '/html', '/css', '/javascript', '/react', '/headless-cms'

    return (
        <>
            <header>
                <Nav activeCategory={activeCategory} />
            </header>
            <main>
                <Resources category={currentCategory} />
            </main>
        </>
    );
}
