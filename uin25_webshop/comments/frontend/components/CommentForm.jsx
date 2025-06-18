import { useState } from "react";

export default function CommentForm({ productid, loggedInUser }) {
  const [comment, setComment] = useState([]);

  /*TODO: Lage en funksjon som tar imot de ulike verdiene vi må sende til sanity for å legge igjen en ny kommentar */

  /*TODO: Funksjon for å håndtere endringer i kommentar feltet*/

  console.log("fra comment", loggedInUser, productid);
  return (
    <form>
      <label>
        Brukernavn
        <input
          type="text"
          name="user"
          defaultValue={loggedInUser?.name}
          placeholder={loggedInUser?.name}
        />
      </label>
      <label>
        Kommentar
        <textarea name="comment"></textarea>
      </label>
      <button>Send</button>
    </form>
  );
}
