/* eslint-disable react/prop-types */
import "../styles/LayoutStyle.scss"
import Nav from './Nav';
import PageTitle from "./PageTitle";
import Ressurser from "../scripts/ressurser";


export default function Layout({ category }) {
    const resources = Ressurser();
    const filteredResources = resources.filter(resource => resource.category === category);
    return (
        <div>
            <main>
                <Nav />
                <section id="currentCategory">
                    <PageTitle title="HÆÆLLÆ"/>
                    <p></p>
                    <ul>
                        {filteredResources.map((resource, index) => (
                            <li key={index}>{resource.title}</li>))}
                    </ul>
                </section>
            </main>
        </div>
    )
}