function Navbar({ username }) {
    return (
        <header>
            <nav>
                <a href="#">ToDo</a>
                <a href="#">{username}</a>
            </nav>
        </header>
    );
}

export default Navbar;
