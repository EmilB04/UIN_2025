/* eslint-disable react/prop-types */
import Todo from './Todo';

function Todos({ startTodos, setTodos }) {
    return (
        <section>
            <h2>ToDos</h2>
            {startTodos.map((todo) => (
                <Todo title={todo.title} content={todo.content} key={todo.id} setTodos={setTodos} />
            ))}
        </section>
    );
}
export default Todos;