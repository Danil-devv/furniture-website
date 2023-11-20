let data = []

function addToCart(id) {
    let product;
    if (sessionStorage.getItem(String(id)) === null) {
        product = {id: id, name: data[id].name, price: data[id].price, image: data[id].image, quantity: 1}
        sessionStorage.setItem(String(id), JSON.stringify(product))
    } else {
        product = JSON.parse(sessionStorage.getItem(String(id)))
        product.quantity++
        sessionStorage.setItem(String(id), JSON.stringify(product))
    }
}

fetch("./data/products.json")
    .then(function(response){
        return response.json();
    })
    .then(function(products){
        let placeholder = document.querySelector("#data-output");
        let out = "<div class=\"row\" style=\"margin-top: 50px;\">";
        let product;
        for (let i = 1; i <= products.length; i++) {
            product = products[i-1];
            data.push(product)
            out += `<div class="col-md-3 py-3 py-md-0">
                            <div class="card" id="tpc">
                                <img src='${product.image}' alt="" class="card image-top">
                                <div class="card-body">
                                    <h3 class="card-titel text-center">${product.name}</h3>
                                    <p class="card-text text-center">$${product.price}</p>
                                    <div id="btn3"><a href="product_card.html"><button>Shop Now</button></a></div>
                                    <div id="btn3" onclick="addToCart(${product.id-1})"><a><button>Add to card</button></a></div>
                                </div>
                            </div>
                        </div>`;

            if (i % 4 === 0) {
                if (i !== products.length) {
                    out += `</div><div class="row" style="margin-top: 50px;">`
                }
            }

            if (i === products.length) {
                out += '</div>'
            }
        }

        placeholder.innerHTML = out;
    });
