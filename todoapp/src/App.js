import { element } from "./view/html-util.js";

export class App {
	mount() {
		const formElement = document.querySelector("#js-form");
		const inputElement = document.querySelector("#js-form-input");
		const containerElement = document.querySelector("#js-todo-list");
		const todoItemCountElement = document.querySelector("#js-todo-count");

		let todoItemCount = 0;
		formElement.addEventListener("submit", (event) => {
			// stop original submit event
			event.preventDefault();
			// make li in todo list
			const todoItemElement = element`<li>${inputElement.value}</li>`;
			// add todo item to container
			containerElement.appendChild(todoItemElement);
			// increment todo item and update text
			todoItemCount += 1;
			todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
			// reset input field
			inputElement.value = "";
		});
	}
}
