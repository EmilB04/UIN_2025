import "../styles/todo.scss"
function Todo({ title, content }) {
    return (
        <article>
            <h3>{title}</h3>
            <p>{content}</p>
            <button>Ferdig</button>
        </article>
    )
}

export default Todo;