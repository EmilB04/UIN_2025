import "../styles/LayoutStyle.scss";
import { useParams } from 'react-router';
import Nav from './Nav';
import Resources from './Resources';

export default function Layout() {
    const { category } = useParams();
    const currentCategory = category || "html"; // Default to "html" if no category is provided

    return (
        <>
            <div className="content">
                <header>
                    <Nav />
                </header>
                <main>
                    <Resources category={currentCategory} />
                </main>
            </div>
        </>
    );
}