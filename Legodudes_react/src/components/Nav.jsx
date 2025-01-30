import NavItem from "./NavItem";

export default function Nav() {
  const categories = [
    {
      id: 1,
      name: "City",
    },
    {
      id: 2,
      name: "Ninjago",
    },
    {
      id: 3,
      name: "Castles and Knights",
    },
    {
      id: 4,
      name: "Marine and Pirates",
    },
    {
      id: 5,
      name: "Movie Characters",
    },
  ];
  return (
    <nav>
      <ul>
        {categories.map((category) => (
          <NavItem category={category.name} key={category.id} />
        ))}
      </ul>
    </nav>
  );
}
