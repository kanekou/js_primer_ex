import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
	constructor() {
		this.todoListModel = new TodoListModel();
	}
	mount() {
		const formElement = document.querySelector("#js-form");
		const inputElement = document.querySelector("#js-form-input");
		const containerElement = document.querySelector("#js-todo-list");
		const todoItemCountElement = document.querySelector("#js-todo-count");

		this.todoListModel.onChange(() => {
			const todoListElement = element`<ul />`;
			const todoItems = this.todoListModel.getTodoItems();
			//それぞれのTodoItem要素をtodoListElement以下へ追加する
			todoItems.forEach(item => {
				const todoItemElement = element`<li>${item.title}</li>`;
				todoListElement.appendChild(todoItemElement);
			});
			// containerElementの中身をtodoListElementで上書きする
			render(todoListElement, containerElement);
			// アイテム数の表示を更新
			todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
		});

		formElement.addEventListener("submit", (event) => {
			// stop original submit event
			event.preventDefault();
			// add new TodoItem to TodoList
			this.todoListModel.addTodo(new TodoItemModel({
				title: inputElement.value,
				completed: false
			}));
			inputElement.value = "";
		});
	}
}
