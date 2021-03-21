import { App } from "./src/App.js";

const formElement = document.querySelector("#js-form");
const inputElement = document.querySelector("#js-form-input");
const containerElement = document.querySelector("#js-todo-list");
const todoItemCountElement = document.querySelector("#js-todo-count");

const app = new App({
  formElement,
  inputElement,
  containerElement,
  todoItemCountElement,
});

// ページロードが完了した時のイベント
window.addEventListener("load", () => {
  app.mount();
});

// ページがアンロードされた時のイベント
window.addEventListener("upload", () => {
  app.unmount();
});
