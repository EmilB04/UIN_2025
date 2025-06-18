/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/todoForm.scss";

function Form({ setTodos }) {
    const [todo, setTodo] = useState([]);
    const handleChange = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        setTodo((prev) => ({...prev, [inputName]: inputValue}));

        console.log(todo);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleClick = () => {
        setTodos((prev) => [...prev, { id: prev.length + 1, ...todo }]);
    }
    return (
        <form action="input" onSubmit={handleSubmit}>
            <label htmlFor="to-do">ToDo</label>
            <input type="text" id="to-do" onChange={handleChange} name="title" />
            <label htmlFor="content">Innhold</label>
            <textarea id="content" onChange={handleChange} name="content"></textarea>
            <button onClick={handleClick}>Legg til</button>
        </form>
    )
}

export default Form;