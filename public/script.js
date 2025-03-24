"use strict";

// Declaração de variáveis
const buttonLogin = document.querySelector(".login");
const buttonRegister = document.querySelector(".signup");
const modalElement = document.querySelector(".modal");
const buttonClose = document.querySelector(".close-modal");
const loginForm = document.getElementById("loginForm");

// Função para abrir ou fechar a tela
function toggleModal(displayStyle) {
  modalElement.style.display = displayStyle;
}

buttonLogin.addEventListener("click", () => {
  toggleModal("block");
});

buttonClose.addEventListener("click", () => {
  console.log("teste");
  toggleModal("none");
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
