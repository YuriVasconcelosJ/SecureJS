"use strict";

// Declaração de variáveis
const buttonLogin = document.querySelector(".login");
const buttonRegister = document.querySelector(".signup");
const modalElementLogin = document.querySelector(".modal-login");
const modalElementRegister = document.querySelector(".modal-register");
const buttonCloseLogin = document.querySelector(".close-modal-login");
const buttonCloseRegister = document.querySelector(".close-modal-register");

// Variáveis para envio de informação
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");


// Função para abrir ou fechar a tela
function toggleModal(modalElement ,displayStyle) {
  modalElement.style.display = displayStyle;
}

buttonLogin.addEventListener("click", () => {
  toggleModal(modalElementLogin,"block");
});

buttonRegister.addEventListener("click", () =>{
  console.log("teste");
  toggleModal(modalElementRegister,"block");
})


buttonCloseLogin.addEventListener("click", () => {
  console.log("teste");
  toggleModal(modalElementLogin,"none");
});


buttonCloseRegister.addEventListener("click", () => {
  toggleModal(modalElementRegister,"none");
});



loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const resposta = await fetch("http://localhost:3030/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const dados = await resposta.json();
    document.getElementById("mensagem").textContent = dados.mensagem;

    if (resposta.ok) {
      alert("Login bem-sucedido!");
      // Aqui você pode redirecionar para outra página, armazenar um token, etc.
    } else {
      alert("Falha no login: " + dados.mensagem);
    }
  } catch (erro) {
    console.error("Erro ao fazer login:", erro);
  }
});
