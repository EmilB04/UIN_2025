import "../styles/todoForm.scss";

function Form() {
    return (
        <form action="input">
            <label htmlFor="to-do">ToDo</label>
            <input type="text" id="to-do" />
            <label htmlFor="content">Innhold</label>
            <textarea id="content"></textarea>
            <button type="submit">Legg til</button>

        </form>
    )
}

export default Form;