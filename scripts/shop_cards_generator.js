let data = []
let banned  = []
let jsonProducts = []


function update() {
    let placeholder = document.querySelector("#data-output");
    let out = "<div class=\"row\" style=\"margin-top: 50px;\">";
    let product;
    let cnt = 0;
    for (let i = 1; i <= data.length; i++) {
        if (banned[data[i-1].id - 1]) {
            continue;
        }
        cnt += 1;
        product = data[i-1];
        out += `<div class="col-lg-3 col-md-6 col-sm-12 py-3">
                            <div class="card" id="tpc">
                                <img src='${product.image}' alt="" class="card image-top" height="250px">
                                <div class="card-body">
                                    <h3 class="card-titel text-center">${product.name}</h3>
                                    <p class="card-text text-center">$${product.price}</p>
                                    <div id="btn3"><a href="product_card.html?id=${product.id-1}"><button>About</button></a></div>
                                    <div id="btn3" onclick="addToCart(${product.id-1})"><a><button>Add to card</button></a></div>
                                </div>
                            </div>
                        </div>`;

        if (cnt % 4 === 0) {
            if (i !== data.length) {
                out += `</div><div class="row" style="margin-top: 50px;">`
            }
        }

        if (i === data.length) {
            out += '</div>'
        }
    }

    placeholder.innerHTML = out;
}

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

    // updating count of products in header
    let placeholder = document.querySelector("#header-product-count");
    let total = 0;
    for (let i = 0; i < sessionStorage.length; i++) {
        // set iteration key name
        let key = sessionStorage.key(i);

        // use key name to retrieve the corresponding value
        let product = JSON.parse(sessionStorage.getItem(key));
        total += product.quantity;
    }
    placeholder.innerHTML = `${total}`;
}

document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.getElementById('dropdown');

    dropdown.addEventListener('click', function () {
        const dropdownContent = this.querySelector('.dropdown-content');
        dropdownContent.classList.toggle('show');
    });

    const filterOpener = document.getElementById("filter-opener");

    filterOpener.addEventListener('click', function () {
        const filterContainer = document.getElementById("filt-cont");
        filterContainer.classList.toggle('show')
    })
});

function sortAscending() {
    data.sort((a, b) => parseInt(a.price) - parseInt(b.price))
    update()
}

function sortDescending() {
    data.sort((a, b) => parseInt(b.price) - parseInt(a.price))
    update()
}

function isInteger(value) {
    return !!value.match(/^\d+$/);
}

function filterByPrice() {
    let min = document.getElementById("minValue").value;
    let max = document.getElementById("maxValue").value;

    if (!isInteger(min) || !isInteger(max)) {
        return;
    }

    let mn = Number(min);
    let mx = Number(max);
    for (let i = 0; i < data.length; i++) {
        let product = data[i];
        banned[product.id-1] = (product.price > mx || product.price < mn);
    }

    update();
}

function resetFilter() {
    for (let i = 0; i < data.length; i++) {
        banned[i] = false;
    }

    update();
}

function cancelSorting() {
    for (let i = 0; i < jsonProducts.length; i++) {
        data[i] = jsonProducts[i];
    }

    update();
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
            banned.push(false)
            jsonProducts.push(product)
            out += `<div class="col-lg-3 col-md-6 col-sm-12 py-3">
                            <div class="card" id="tpc">
                                <img src='${product.image}' alt="" class="card image-top" height="250px">
                                <div class="card-body">
                                    <h3 class="card-titel text-center">${product.name}</h3>
                                    <p class="card-text text-center">$${product.price}</p>
                                    <div id="btn3"><a href="product_card.html?id=${product.id-1}"><button>About</button></a></div>
                                    <div id="btn3" onclick="addToCart(${product.id-1})"><a><button>Add to cart</button></a></div>
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
