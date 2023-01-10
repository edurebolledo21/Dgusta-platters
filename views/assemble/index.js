const btnCar = document.querySelector("#car-icon");
const car = document.querySelector(".car");
const tableClear = document.querySelector("#btn-clear");
const tableBuy = document.querySelector("#btn-comprar");
const table = document.querySelector("#table-body");
const carritoBtn = document.querySelectorAll("#add-btn");

//
const ordenarSelect = document.querySelector("#ingredientes");

//carrito de compras
btnCar.addEventListener("click", (e) => {
  car.classList.toggle("show-car");
});

tableClear.addEventListener("click", (e) => {
  table.innerHTML = "";
  articulosCarrito = [];
  syncStorage("carrito", articulosCarrito);
});

tableBuy.addEventListener("click", (e) => {
  if (JSON.parse(localStorage.getItem("carrito")).length !== 0) {
    window.location.href = "/buy/";
  }
});

ordenarSelect.addEventListener("input", (e) => {
  document.querySelector(`#${e.target.value}`).scrollIntoView({ behavior: "smooth" });
});

//carrito de compras - gurdar en el carrito

let articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {
  articulosCarrito.forEach((articulo) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img class="carrito-img" src="${articulo.img}" /></td>
      <td>${articulo.name}</td>
      <td>${articulo.precio}</td>
      <td>${articulo.cantidad}</td>
      <td>
        <svg class="w-6 h-6 delete-btn-carrito" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </td>
    `;

    row.children[4].addEventListener("click", (e) => {
      e.currentTarget.parentElement.remove();
      articulosCarrito = articulosCarrito.filter((elem) => elem.name !== articulo.name);
      syncStorage("carrito", articulosCarrito);
    });

    table.append(row);
  });
});

carritoBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const img = e.target.parentElement.parentElement.children[0].src;
    const name = e.target.parentElement.parentElement.children[1].children[0].textContent;
    const precio = e.target.parentElement.parentElement.children[1].children[1].textContent;

    const exist = [...table.children].find((element) => element.children[1].innerHTML === name);

    if (exist) {
      exist.children[3].innerHTML = Number(exist.children[3].innerHTML) + 1;
      articulosCarrito.find((element) => element.name === name).cantidad++;
      syncStorage("carrito", articulosCarrito);
    } else {
      const nuevoElem = {
        img,
        name,
        precio,
        cantidad: 1,
      };

      articulosCarrito.push(nuevoElem);
      syncStorage("carrito", articulosCarrito);

      table.innerHTML = "";

      articulosCarrito.forEach((articulo) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><img class="carrito-img" src="${articulo.img}" /></td>
          <td>${articulo.name}</td>
          <td>${articulo.precio}</td>
          <td>${articulo.cantidad}</td>
          <td>
            <svg class="w-6 h-6 delete-btn-carrito" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </td>
        `;

        row.children[4].addEventListener("click", (e) => {
          e.currentTarget.parentElement.remove();
          articulosCarrito = articulosCarrito.filter((elem) => elem.name !== articulo.name);
          syncStorage("carrito", articulosCarrito);
        });

        table.append(row);
      });
    }
  })
);

// ingredientes

ordenarSelect.addEventListener("input", (e) => {
  document.querySelector(`#${e.target.value}`).scrollIntoView({ behavior: "smooth" });
});

// guardar
function syncStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
