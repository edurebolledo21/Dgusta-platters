const formulario = document.querySelector('#form');
const inputEmail = document.querySelector('#email-input');
const inputPass = document.querySelector('#email-pass');
const inputConfirmPass = document.querySelector('#pass-confirm');
const formBtn = document.querySelector("#login-btn");

const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

const validation = (regex, e, element) => {
  const isValid = regex.test(e.target.value)
  if (isValid) {
    element.parentElement.querySelector(".svg-div #check-svg").style.display = "block";
    element.parentElement.querySelector(".svg-div #wrong-svg").style.display = "none";
  }
  else {
    element.parentElement.querySelector(".svg-div #check-svg").style.display = "none";
    element.parentElement.querySelector(".svg-div #wrong-svg").style.display = "block";
  }
};

//email

inputEmail.addEventListener('input', e => {
  validation(regexEmail, e, inputEmail);
});

//pass
inputPass.addEventListener('input', e => {
  validation(regexPass, e, inputPass);
})

//confirmar password

inputConfirmPass.addEventListener('input', e => {
  const isValid = e.target.value === inputPass.value;
  if (isValid) {
    inputConfirmPass.parentElement.querySelector(".svg-div #check-svg").style.display = "block";
    inputConfirmPass.parentElement.querySelector(".svg-div #wrong-svg").style.display = "none";
  }
  else {
    inputConfirmPass.parentElement.querySelector(".svg-div #check-svg").style.display = "none";
    inputConfirmPass.parentElement.querySelector(".svg-div #wrong-svg").style.display = "block";
  }
});

formulario.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const newUser = {
      email: inputEmail.value,
      password: inputPass.value
    }

    await axios.post('/api/users', newUser);
    window.location.pathname = '/login'

  } catch (error) {
    const p = document.createElement('p');
    p.innerHTML = error.response.data.error;
    p.classList.add('text-rose-300', 'font-bolt', 'text-center');
    formulario.children[4] ? formulario.children[4].remove() : null;
    formulario.append(p);

  }
});
































// let emailValidation = false;
// let passwordValidation = false;
// let checkValidation = false;

// emailInput.addEventListener("input", (e) => {
//   const EMAIL_REGEX = /^\w+@\w+\.\w+/gm;
//   emailValidation = EMAIL_REGEX.test(e.target.value.trim());
//   validation(emailInput, emailValidation);
// });

// passwordInput.addEventListener("input", (e) => {
//   const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,24}$/gm;
//   passwordValidation = PASSWORD_REGEX.test(e.target.value.trim());
//   validation(passwordInput, passwordValidation);
// });

// checkInput.addEventListener("input", (e) => {
//   checkValidation = e.target.value.trim() === passwordInput.value.trim();
//   validation(checkInput, checkValidation);
// });

// const validation = (input, regexValidation) => {
//   formBtn.disabled = !emailValidation || !passwordValidation || !checkValidation;
//   if (!regexValidation && input.value) {
//     input.parentElement.querySelector(".svg-div #check-svg").style.display = "none";
//     input.parentElement.querySelector(".svg-div #wrong-svg").style.display = "block";
//   } else if (regexValidation) {
//     input.parentElement.querySelector(".svg-div #check-svg").style.display = "block";
//     input.parentElement.querySelector(".svg-div #wrong-svg").style.display = "none";
//   } else if (!input.value) {
//     input.parentElement.querySelector(".svg-div #check-svg").style.display = "none";
//     input.parentElement.querySelector(".svg-div #wrong-svg").style.display = "none";
//   }
// };
