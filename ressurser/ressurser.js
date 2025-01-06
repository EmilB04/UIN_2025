const resources = [
    {
        category: "HTML",
        text: "HTML står for HyperText Markup Language, og er et strukturspråk som brukes for å lage strukturer til nettside- og applikasjonsgrensesnitt.",
        sources: [
            {
                title: "W3Schools",
                url: "https://www.w3schools.com/html/"
            },
            {
                title: "HTML Living standard",
                url: "https://html.spec.whatwg.org/multipage/"
            },
            {
                title: "HTML.com Tutorials",
                url: "https://html.com/"
            },
        ]
    },
    {
        category: "CSS",
        text: "CSS står for Cascading StyleSheets, og brukes for å sette stilregler på HTML-elementer.",
        sources: [
            {
                title: "W3Schools",
                url: "https://www.w3schools.com/css/"
            },
            {
                title: "W3C HTML & CSS Standards",
                url: "https://www.w3.org/standards/webdesign/htmlcss.html"
            },
            {
                title: "W3C CSS Validator",
                url: "https://jigsaw.w3.org/css-validator/"
            },
            {
                title: "CSS Tricks",
                url: "https://css-tricks.com/"
            },
        ]
    },
    {
        category: "JavaScript",
        text: "JavaScript er et scriptspråk basert på EcmaScript. JavaScript kjører direkte i nettleseren, og brukes ofte til å manipulere HTML og CSS i webgrensnesnitt.",
        sources: [
            {
                title: "W3Schools",
                url: "https://www.w3schools.com/js/"
            },
            {
                title: "MDN Web Docs",
                url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            },
            {
                title: "How to read JavaScript Documentation",
                url: "https://www.youtube.com/watch?v=O3iR-CIufKM"
            },
        ]
    },
    {
        category: "React",
        text: "React er et rammeverk bygget i JavaScript. React bruker komponenter og states for å lage en levende frontend.",
        sources: [
            {
                title: "React documentation",
                url: "https://reactjs.org/docs/getting-started.html"
            },
            {
                title: "W3Schools",
                url: "https://www.w3schools.com/REACT/DEFAULT.ASP"
            },
            {
                title: "How to read JavaScript Documentation",
                url: "https://www.youtube.com/watch?v=O3iR-CIufKM"
            },
        ]
    },
    {
        category: "Sanity and headless CMS",
        text: "Sanity er et headless CMS som står for innholdsadministrasjon. Innhold hentes inn i applikasjoner via GROQ-spørringer.",
        sources: [
            {
                title: "Sanity documentation",
                url: "https://www.sanity.io/docs"
            },
            {
                title: "OnCrawl: a beginners guide to headless CMS",
                url: "https://www.oncrawl.com/technical-seo/beginners-guide-headless-cms/"
            },
            {
                title: "Section.io: Getting started with Sanity CMS",
                url: "https://www.section.io/engineering-education/getting-started-with-sanity-cms/"
            },
        ]
    },
];
// Referanser til HTML-elementer
const navList = document.querySelector("nav ul");
const sectionTitle = document.querySelector("section h1");
const sectionText = document.querySelector("section p");
const sectionSources = document.querySelector("section ul");

// Funksjon for å oppdatere innholdet
function updateContent(category) {
    // Filtrer for å finne den riktige ressursen
    const [resource] = resources.filter(resource => resource.category === category);
    if (resource) {
        sectionTitle.textContent = resource.category;
        sectionText.textContent = resource.text;

        // Oppdater kildelisten med map()
        sectionSources.innerHTML = resource.sources.map(source => `<li><a href="${source.url}" target="_blank">${source.title}</a></li>`).join("");

        // Fjern #active fra alle li-elementer
        const activeSection = navList.querySelector("#active");
        if (activeSection) {
            activeSection.removeAttribute("id");
        }

        // Legg til #active til den klikkede li
        const clickedSection = Array.from(navList.children).find(li => li.textContent === category);
        if (clickedSection) {
            clickedSection.id = "active";
        }
    }
}

// Fyll navigasjonen og legg til klikkhendelser
navList.innerHTML = resources.map(resource =>`<li>${resource.category}</li>`).join("");

// Legg til klikkhendelser på hver navigasjonspost
Array.from(navList.children).forEach(li => {
    li.addEventListener("click", () => updateContent(li.textContent));
});

// Vis første ressurs ved oppstart
if (resources.length > 0) {
    updateContent(resources[0].category);
}