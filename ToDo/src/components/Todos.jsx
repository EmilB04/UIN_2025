import Todo from './Todo';

function Todos({ startTodos }) {
    return (
        <section>
            <h2>ToDos</h2>
            {startTodos.map((todo) => (
                <Todo title={todo.title} content={todo.content} key={todo.id} />
            ))}
        </section>
    );
}
export default Todos;