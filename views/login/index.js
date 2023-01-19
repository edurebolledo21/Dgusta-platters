const formulario = document.querySelector("#form");
const inputEmail = document.querySelector("#email-input");
const inputPass = document.querySelector("#email-pass");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const email = inputEmail.value;
    const password = inputPass.value;
    const { data: credentials } = await axios.post("/api/login", {
      email,
      password,
    });
    console.log(credentials);
    localStorage.setItem("inicio", true);
    window.location.replace(`/`);
  } catch (error) {
    const p = document.createElement("p");
    p.innerHTML = error.response.data.error;
    p.classList.add("text-rose-300", "font-bolt", "text-center");
    formulario.children[3] ? formulario.children[3].remove() : null;
    formulario.append(p);
  }
});

let btnShow = document.querySelector(".btn-show");
let btnHide = document.querySelector(".btn-hide");
let passContainer = document.querySelector("#email-pass");

[btnShow, btnHide].forEach((btn) =>
  btn.addEventListener("click", (e) => {
    btnShow.classList.toggle("btn-display");
    btnHide.classList.toggle("btn-display");
    e.target === btnShow || btnShow.contains(e.target) ? passContainer.setAttribute("type", "text") : passContainer.setAttribute("type", "password");
  })
);
