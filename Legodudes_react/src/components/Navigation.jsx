import NavItem from "./NavItem";

const categories = [
    {
        id: 1, 
        name: "City"
    },
    {
        id: 2,
        name: "Ninjago"
    },
    {
        id: 3,
        name: "Castles & Knights"
    },
    {
        id: 4,
        name: "Marine and Pirates"
    },
    {
        id: 5,
        name: "Movie Characters"
    }
];

function Navigation() {
    return (
        <nav>
            <ul>
                {categories.map((category) => 
                    <NavItem category={category.name} key={category.id} />)}
            </ul>
        </nav>
    );
}

export default Navigation;
