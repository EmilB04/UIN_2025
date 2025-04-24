import React from "react";

export default function Layout({ children }) {
    return (
        <div>
            <p>Layout: Nav section here</p>
            <main>{children}</main>
        </div>
    );
}
