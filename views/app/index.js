const btnCar = document.querySelector("#car-icon");
const car = document.querySelector(".car");
const btnMenu = document.querySelector("#bar-icon");
const menu = document.querySelector(".menu");
const tableClear = document.querySelector("#btn-clear");
const tableBuy = document.querySelector("#btn-comprar");

const table = document.querySelector("#table-body");
const carritoBtn = document.querySelectorAll("#add-btn");

const ordenarSelect = document.querySelector("#ordenar");

const clearLogin = document.querySelector(".login");
const barOption = document.querySelector(".bar-option");
const Options = document.querySelector("#bar-icon");
const cerrarSesion = document.querySelector(".cerrar-sesion");
const cerrarSesionIcon = document.querySelector("#logout-icon");

const armar = document.querySelector("#assemble");

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

armar.addEventListener("click", (e) => {
  if (localStorage.getItem("inicio")) {
    window.location.href = "/assemble/";
  } else {
    window.location.href = "/login/";
  }
});

if (localStorage.getItem("inicio")) {
  clearLogin.classList.add("none");
  Options.classList.add("none");
} else {
  cerrarSesion.classList.add("none");
  cerrarSesionIcon.classList.add("none");
}

carritoBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    if (localStorage.getItem("inicio")) {
      let target = btn.parentElement.parentElement;

      const img = target.children[0].src;
      const name = target.children[1].children[0].textContent;
      const precio = target.children[1].children[1].textContent;

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
    } else {
      window.location.href = "/login/";
    }
  })
);

//carrito de compras
btnCar.addEventListener("click", (e) => {
  if (localStorage.getItem("inicio")) {
    car.classList.toggle("show-car");
    menu.classList.remove("show-menu");
  } else {
    window.location.href = "/login/";
  }
});

btnMenu.addEventListener("click", (e) => {
  menu.classList.toggle("show-menu");
  car.classList.remove("show-car");
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

//cerrar sesión

[cerrarSesion, cerrarSesionIcon].forEach((elem) =>
  elem.addEventListener("click", async (e) => {
    try {
      await axios.get("/api/logout");
      localStorage.removeItem("inicio");
      clearLogin.classList.remove("none");
      Options.classList.remove("none");
      cerrarSesion.classList.add("none");
      cerrarSesionIcon.classList.add("none");
    } catch (error) {
      console.log(error);
    }
  })
);

// guardar

function syncStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// zoom

// const zoom = document.querySelectorAll(".zoom")[0];
// const zoomImage = document.querySelectorAll(".zoom-image")[0];

// let clearSrc;
// let zoomLevel = 1;

// const enterImage = function (e) {
//   zoom.classList.add("show", "loading");
//   clearTimeout(clearSrc);

//   let posX = e.clientX;
//   let posY = e.clientY + document.documentElement.scrollTop;

//   zoom.style.top = `${posY - zoom.offsetHeight / 2}px`;
//   zoom.style.left = `${posX - zoom.offsetWidth / 2}px`;

//   let originalImage = this.getAttribute("src");

//   zoomImage.setAttribute("src", originalImage);

//   // remove the loading class
//   zoomImage.onload = function () {
//     console.log("hires image loaded!");
//     setTimeout(() => {
//       zoom.classList.remove("loading");
//     }, 500);
//   };
// };

// const leaveImage = function () {
//   // remove scaling to prevent non-transition
//   zoom.style.transform = null;
//   zoomLevel = 1;
//   zoom.classList.remove("show");
//   clearSrc = setTimeout(() => {
//     zoomImage.setAttribute("src", "");
//   }, 250);
// };

// const move = function (e) {
//   e.preventDefault();

//   let posX = e.clientX;
//   let posY = e.clientY + document.documentElement.scrollTop;

//   // move the zoom a little bit up on mobile (because of your fat fingers :<)
//   zoom.style.top = `${posY - zoom.offsetHeight / 2}px`;
//   zoom.style.left = `${posX - zoom.offsetWidth / 2}px`;

//   let percX = (posX - this.offsetLeft) / this.offsetWidth,
//     percY = (posY - this.offsetTop) / this.offsetHeight;

//   let zoomLeft = (-percX * zoomImage.offsetWidth + zoomImage.offsetWidth / 2) * 3.5,
//     zoomTop = (-percY * zoomImage.offsetHeight + zoomImage.offsetHeight / 2) * 3.5;

//   zoomImage.style.left = `${zoomLeft}px`;
//   zoomImage.style.top = `${zoomTop}px`;
// };

// const images = document.querySelectorAll("#container-buy > img");

// images.forEach((image) => {
//   if (!window.matchMedia("(pointer: coarse)").matches) {
//     image.addEventListener("mouseover", enterImage);
//     image.addEventListener("mouseout", leaveImage);
//     image.addEventListener("mousemove", move);

//     image.addEventListener("wheel", (e) => {
//       e.preventDefault();
//       e.deltaY > 0 ? (zoomLevel -= 0.5) : (zoomLevel += 0.5);

//       if (zoomLevel < 1) zoomLevel = 1;
//       if (zoomLevel > 2) zoomLevel = 2;
//       zoom.style.transform = `scale(${zoomLevel})`;
//     });
//   }
// });
