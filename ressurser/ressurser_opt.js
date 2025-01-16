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
/*
<main>
        <nav>
            <ul><!-- Categories --></ul>
        </nav>
        <section>
            <h1><!-- Current Category --></h1>
            <p><!-- Text --></p>
            <ul><!-- Sources --></ul>
        </section>
    </main>
*/


// Variabler
let categoriesHTML = ""; // Holder på nav-kategoriene
let currentCategoryHTML = ""; // Holder på innholdet i kategorien

// Vis nav
function showNav() {
    resources.map((resource) => categoriesHTML +=
    `<ul>
        <li>${resource.category}</li>
    </ul>`
);
    document.getElementById("categories").innerHTML = categoriesHTML;
}


// Løper gjennom alle ressursene og viser kategorien som er valgt:
function showCategory(category) {
    resources.map((resource) => {
        if (resource.category === category) { currentCategoryHTML =
                `<h1>${resource.category}</h1>
                <p>${resource.text}</p>
                <ul>${resource.sources.map((source) => 
                    `<li>
                        <a href="${source.url}">${source.title}</a>
                    </li>`).join("")}
                </ul>`;
        }
    });
    document.querySelector("#currentCategory").innerHTML = currentCategoryHTML;
}

// Oppdater kategori ved klikk, og legg til .active på valgt kategori
document.querySelector("#categories").addEventListener("click", (function (event) {
    showCategory(event.target.textContent);
    const active = document.querySelector("#active");
    if (active) {
        active.removeAttribute("id");
    }
}));


// Vis nav-bar og første kategori ved lasting av siden
showNav();
showCategory(resources[0].category);