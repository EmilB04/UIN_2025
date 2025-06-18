import { useState } from "react";

export default function Login({ storageUser, setSignedIn }) {
  const [userLogin, setUserLogin] = useState([]);
  const [error, setError] = useState();

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setUserLogin((prev) => ({ ...prev, [inputName]: inputValue }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const existingUser = JSON.parse(storageUser);
    const exists =
      userLogin.username === existingUser.username &&
      userLogin.password === existingUser.password;
    console.log(exists);
    exists
      ? setSignedIn(true)
      : setError("Brukernavn eller passord stemmer ikke");
  };

  return (
    <section>
      <h1>Logg inn</h1>
      <form>
        <label>
          Brukernavn
          <input
            type="text"
            name="username"
            onChange={handleChange}
          />
        </label>
        <label>
          Passord
          <input
            type="password"
            placeholder="*********"
            name="password"
            onChange={handleChange}
          />
        </label>
        <button onClick={handleClick}>Logg inn</button>
      </form>
      {error}
    </section>
  );
}
