function update() {
    let placeholder = document.querySelector("#data-output");
    let out = "";

    // iterate localStorage
    for (let i = 0; i < sessionStorage.length; i++) {

        // set iteration key name
        let key = sessionStorage.key(i);

        // use key name to retrieve the corresponding value
        let product = JSON.parse(sessionStorage.getItem(key));

        out += `<div class="shopping-cart-item">
                        <img src=${product.image} width="150px" height="150px">
                        <div class="shopping-cart-data">
                            <h3 class="shopping-cart-item-name">${product.name}</h3>
                            <div class="shopping-cart-counter">
                                <div id="btn5"><button onclick="incrementCount(${product.id})">+</button></div>
                                <h4 class="shopping-cart-item-quantity">${product.quantity}</h4>
                                <div id="btn5" onclick="decrementCount(${product.id})"><button>-</button></div>
                            </div>
                            <div class="shopping-cart-total-price-item">
                                <h4>Cost:</h4>
                                <h4 class="shopping-cart-item-price">$${product.quantity * product.price}</h4>
                            </div>
                        </div>
                    </div>`;
    }

    placeholder.innerHTML = out;
}

function decrementCount(id) {
    let product = JSON.parse(sessionStorage.getItem(String(id)));
    product.quantity--;
    if (product.quantity === 0) {
        sessionStorage.removeItem(String(id));
    } else {
        sessionStorage.setItem(String(id), JSON.stringify(product))
    }
    update();
}

function incrementCount(id) {
    let product = JSON.parse(sessionStorage.getItem(String(id)));
    product.quantity++;
    sessionStorage.setItem(String(id), JSON.stringify(product))
    update();
}

fetch("./data/products.json")
    .then(function(response){
        return response.json();
    })
    .then(function(products){
        let placeholder = document.querySelector("#data-output");
        let out = "";

        // iterate localStorage
        for (let i = 0; i < sessionStorage.length; i++) {

            // set iteration key name
            let key = sessionStorage.key(i);

            // use key name to retrieve the corresponding value
            let product = JSON.parse(sessionStorage.getItem(key));

            out += `<div class="shopping-cart-item">
                        <img src=${product.image} width="150px" height="150px">
                        <div class="shopping-cart-data">
                            <h3 class="shopping-cart-item-name">${product.name}</h3>
                            <div class="shopping-cart-counter">
                                <div id="btn5"><button onclick="incrementCount(${product.id})">+</button></div>
                                <h4 class="shopping-cart-item-quantity">${product.quantity}</h4>
                                <div id="btn5"><button onclick="decrementCount(${product.id})">-</button></div>
                            </div>
                            <div class="shopping-cart-total-price-item">
                                <h4>Cost:</h4>
                                <h4 class="shopping-cart-item-price">$${product.quantity * product.price}</h4>
                            </div>
                        </div>
                    </div>`;
        }

        placeholder.innerHTML = out;
    });
