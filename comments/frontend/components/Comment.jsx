import "../src/styles/commentcard.scss";
export default function Comment({ comment }) {
  return (
    <article key={comment._key} className="commentCard">
      <img src={comment.user.image} className="user" />
      <p className="username">{comment.user.name}</p>
      <p className="comment">{comment.comment}</p>
    </article>
  );
}
