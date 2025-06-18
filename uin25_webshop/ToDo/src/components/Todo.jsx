import "../styles/todo.scss"

function Todo({ title, content, setTodos }) {
    const handleClick = () => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.title !== title));
    }
    return (
        <article>
            <h3>{title}</h3>
            <p>{content}</p>
            <button onClick={handleClick}>Ferdig</button>
        </article>
    )
}

export default Todo;