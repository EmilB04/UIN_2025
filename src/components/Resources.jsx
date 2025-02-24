/* eslint-disable react/prop-types */
import Ressurser from '../scripts/ressurser';

export default function Resources({ category }) {
    const resources = Ressurser().filter(resource => resource.category === category);

    return (
        <div>
            <h2>{category.toUpperCase()}</h2>
            <ul>
                {resources.map((resource, index) => (
                    <li key={index}>
                        <a href={resource.url} target="_blank">
                            {resource.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}