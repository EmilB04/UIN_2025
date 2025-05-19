import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div>
            <Nav />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
