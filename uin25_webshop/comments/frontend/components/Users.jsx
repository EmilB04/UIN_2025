import { useEffect, useState } from "react";
import { fetchAllUsers } from "../sanity/services/userServices";
import UserCard from "./UserCard";

export default function Users() {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const data = await fetchAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  console.log(users);

  return (
    <section className="users">
      <h1>Brukere</h1>
      {users?.map((u) => (
        <UserCard user={u} key={u._id} />
      ))}
    </section>
  );
}
