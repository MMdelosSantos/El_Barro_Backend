const socket = io()
const divProducts = document.getElementById("products")

socket.on('Listado de productos actualizado', (products) => {
    divProducts.innerHTML = "<h2>Listado de Productos:</h2>";

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.textContent = `Code: ${product.code}, : ${product.title}`;
        divProducts.appendChild(productElement);
    });
});

