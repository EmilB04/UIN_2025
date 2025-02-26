/* eslint-disable react/prop-types */
import Ressurser from '../scripts/ressurser';
import PageTitle from './PageTitle';
import "../styles/LayoutStyle.scss";

export default function Resources({ category }) {
    const resources = Ressurser();
    // Filter resources based on the selected category
    const filteredResources = resources.filter(resource => resource.category === category);

    return (
        <div>
            <section id="currentCategory">
                <PageTitle title={category.toUpperCase()} />
                <ul>
                    {filteredResources.map((resource, index) => (
                        <li key={index}>
                            <a href={resource.url} target="_blank"> {resource.title}</a>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}