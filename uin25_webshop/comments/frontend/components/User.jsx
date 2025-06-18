import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserBySlug } from "../sanity/services/userServices";

export default function User() {
  const { user } = useParams();
  const [userData, setUserData] = useState([]);
  const [comments, setComments] = useState([]);

  const getUserBySlug = async (slug) => {
    const data = await fetchUserBySlug(slug);
    setUserData(data[0]);
  };

  useEffect(() => {
    getUserBySlug(user);
  }, [user]);

  /*TODO: Lage funksjon som henter en fetch for å hente alle kommentarene en bruker har lagt igjen på ulike produkter */

  /*TODO: Bruk useEffect for å hente kommentarer basert på brukerens ID
  ved å kalle funksjonen og sende med ID som argument.*/

  return (
    <>
      <h1>{userData.name}</h1>
      <ul>
        {comments?.map((comment) => (
          <li key={comment._id}>
            <article>
              <h3>{comment.product}</h3>
              {comment.comments.map((text) => (
                <p>{text.comment}</p>
              ))}
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
