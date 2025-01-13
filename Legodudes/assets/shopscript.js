// Gå gjennom alle produkter. Gen erere HTML for hvert produkt og skrive dette til HTML

// En variabel som kan holde på HTML-koden
let productHTML = "";

products.map((product, index) => productHTML += 
        `<article class="product-card">
            <img src="assets/website_images/PROD_${product.imagefile}" alt="PRODUKTTITTEL">
            <a href="#KATEGORISIDE">Ninjago</a>
            <h3>${product.title}</h3>
            <p>kr. ${product.price},-</p>
            <button class="add-to-cart">Legg i handlevogn</button>
        </article>`);

// Finn #productlist og fyll den med verdiene i variabelen productHTML
document.querySelector("#product-list").innerHTML = productHTML;