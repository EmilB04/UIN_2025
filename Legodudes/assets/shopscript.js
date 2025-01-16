//Gå gjennom alle producter, generere HTML for hvert produkt, skrive dette til index.html

//En variabel som kan holde på HTML-en for produktene:
let productHTML = ""

//Løper gjennom products-arrayen:
products.map((product) => productHTML += 
            `<article class="product-card">
                <img src="website_images/PROD_${product.imagefile}" alt="PRODUKTTITTEL" />
                <a href="#KATEGORISIDE">Ninjago</a>
                <h3>${product.title}</h3>
                <p>Kr. ${product.price},-</p>
                <button onclick="addProductToCart(${product.prodid})">Legg i handlekurv</button>
            </article>`)

//Finn #productlist, og fyll den med verdiene i variabelen productHTML:
document.getElementById("productlist").innerHTML = productHTML

// Lage toggle funksjon for å vise og skjule handlekurven
document.getElementById("shoppingcart").addEventListener("click", function () {
    document.getElementById("cart").classList.toggle("visible");
}) 

// Funksjon for å legge til produkt i handlekurv
function addProductToCart(prodid) {
    console.log("Du vil legge til produktId " + prodid)
    // Bruk .some for å sjekke om prodid allerede finnes i cart
    const idExists = cart.some(cartprod => cartprod.cartprodid === prodid)
    if (idExists) {
        // Oppdatere antallet i handlekurven
        // Først: finne indexen til denne id-en
        const index = cart.findIndex(p => p.cartprodid === prodid)
        // Deretter: øke antallet med 1
        cart[index].quanity++
    }
    else {
        cart.push({cartprodid: prodid, quanity: 1})
    }
    console.log(cart)
    printCart()
}
// Funksjon som oppdaterer handlekurven
function printCart() {
    let cartHTML = ""
    let cartTotal = 0
    let cartQuantity = 0
    cart.map((cartprod, index) => {
        const currentProduct = products.findIndex(p => p.prodid === cartprod.cartprodid)
        const currentProductInfo = products[currentProduct]
        cartHTML += 
            `<article class="cart-product">
                <span class="title">${currentProductInfo.title}</span>
                <span class="price">${currentProductInfo.price},-</span>
                <span class="quantity">x<span class="quantity-number">${cartprod.quanity}</span></span>
                <button class="delete">x</button>
            </article>`

        cartTotal += currentProductInfo.price * cartprod.quanity
        cartQuantity += cartprod.quanity
    })
    // Skrive ut generert HTMl til index
    document.getElementById("cart-products").innerHTML = cartHTML
    document.getElementById("cart-total").innerHTML = cartTotal
    document.getElementById("cartcount").innerHTML = cartQuantity
}
printCart()