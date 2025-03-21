"use strict";

// Declaração de variáveis
const buttonLogin = document.querySelector(".login");
const buttonRegister = document.querySelector(".signup");
const modalElement = document.querySelector(".modal");
const buttonClose = document.querySelector(".close-modal");

// Função para abrir ou fechar a tela
function toggleModal(displayStyle) {
  modalElement.style.display = displayStyle;
}

buttonLogin.addEventListener("click", () => {
  toggleModal("block");
});

buttonClose.addEventListener("click", () => {
  console.log('teste')
  toggleModal("none");
});