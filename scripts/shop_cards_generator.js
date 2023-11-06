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

            out += `<div class="col-md-3 py-3 py-md-0">
                            <div class="card" id="tpc">
                                <img src='${product.image}' alt="" class="card image-top">
                                <div class="card-body">
                                    <h3 class="card-titel text-center">${product.name}</h3>
                                    <p class="card-text text-center">${product.price}</p>
                                    <div id="btn3"><a href="product_card.html"><button>Shop Now</button></a></div>
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
