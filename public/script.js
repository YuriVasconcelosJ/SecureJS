"use strict";

// Declaração de variáveis
const buttonLogin = document.querySelector(".login");
const buttonRegister = document.querySelector(".signup");
const modalElement = document.querySelector(".modal");

// Função para abrir ou fechar a tela
function toggleModal(displayStyle) {
  modalElement.style.display = displayStyle;
}

buttonLogin.addEventListener("click", () => {
  toggleModal("block");
});

buttonLogin.addEventListener("click", () => {
  toggleModal("hidden");
});
