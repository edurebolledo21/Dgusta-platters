const table = document.querySelector("#table-body");
const totalHtml = document.querySelector("#total");
const ordenar = document.querySelector("#btn-comprar");

let articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {
  articulosCarrito.forEach((articulo) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img class="carrito-img" src="${articulo.img}" /></td>
      <td>${articulo.name}</td>
      <td>${articulo.precio}</td>
      <td>${articulo.cantidad}</td>
    `;

    table.append(row);
  });
});

const totalArray = articulosCarrito.map((articulo) => Number(articulo.precio.split("$")[1].split(" ", 1) * articulo.cantidad));
let total = Number(totalArray.reduce((cuenta, precio) => cuenta + precio, 0).toFixed(2));

const element = document.createElement("p");
element.setAttribute("id", "p-total");

element.innerHTML = `
<span>TOTAL: </span> <span id="span-total">USD ${total}</span>
`;

totalHtml.append(element);

// ordenar.addEventListener("click", (e) => {
//   const pdfArray = articulosCarrito.map(
//     (articulo) =>
//       `-- Nombre: ${articulo.name} /
//     Precio: ${articulo.precio} /
//   Cantidad: ${articulo.cantidad}`
//   );
//   console.log(pdfArray);
//   const documento = new jsPDF();
//   documento.text(
//     `${pdfArray}
//   TOTAL: ${total} `,
//     10,
//     10
//   );
//   documento.save("PEDIDO.pdf");
//   table.innerHTML = "";
//   articulosCarrito = [];
//   syncStorage("carrito", articulosCarrito);
// });

ordenar.addEventListener("click", async (e) => {
  const articulos = articulosCarrito.map((articulo) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: articulo.name,
        },
        unit_amount: parseInt(articulo.precio.split("$")[1].split(" ", 1) * 100),
      },
      quantity: articulo.cantidad,
    };
  });

  await axios.post("/api/stripe", {
    articulos,
    domain: window.location.origin,
  });

  articulosCarrito = [];
  syncStorage("carrito", articulosCarrito);
});

function syncStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
