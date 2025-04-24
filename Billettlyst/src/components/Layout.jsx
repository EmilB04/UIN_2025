import React from "react";
import Nav from "./Nav";

export default function Layout({ children }) {
    return (
        <div>
            <Nav />
            <p>Layout: Nav section here</p>
            <main>{children}</main>
        </div>
    );
}
