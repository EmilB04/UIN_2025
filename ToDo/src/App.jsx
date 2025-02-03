// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import "./styles/nav.scss"
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Todos from "./components/Todos";

function App() {
    const startTodos = [
        { id: 1, title: "Lage middag", content: "Lage spaghetti" },
        { id: 2, title: "Gjøre oblig", content: "Fullføre oblig 1 i Rammeverk og .NET" },
        { id: 3, title: "Dra på jobb", content: "Klokken 16" },
    ];
    const username = "emilber";
    // const [count, setCount] = useState(0)

    return (
        <>
            <Navbar username={username} />
            <main>
                <h1>ToDo App</h1>
            </main>
            <Form />
            <Todos startTodos={startTodos} />
        </>
    );
}

export default App;
