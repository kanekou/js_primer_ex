import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { render } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListView.js";

export class App {
  constructor({
    formElement,
    inputElement,
    containerElement,
    todoItemCountElement,
  }) {
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel();

    this.formElement = formElement;
    this.inputElement = inputElement;
    this.containerElement = containerElement;
    this.todoItemCountElement = todoItemCountElement;

    this.handelChange = this.handelChange.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }
  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
    this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {{ id:number, completed: boolean }}
   */
  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{ id: number }}
   */
  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id });
  }

  /**
   * フォームを送信時に呼ばれるリスナー関数
   * @param {Event} event
   */
  handleEvent(event) {
    // stop original submit event
    event.preventDefault();
    // value is empty
    if (this.inputElement.value == "") {
      return;
    }
    // add new TodoItem to TodoList
    this.handleAdd(this.inputElement.value);
    this.inputElement.value = "";
  }

  /**
   * TodoListViewが変更した時に呼ばれるリスナー関数
   */
  handelChange() {
    const todoItems = this.todoListModel.getTodoItems();
    const containerElement = this.containerElement;
    const todoItemCountElement = this.todoItemCountElement;
    const todoListElement = this.todoListView.createElement(todoItems, {
      // Appに定義したリスナー関数を呼び出す
      onUpdateTodo: ({ id, completed }) => {
        this.handleUpdate({ id, completed });
      },
      // todo itemが削除イベントを発生した時に呼ばれるリスナー関数
      onDeleteTodo: ({ id }) => {
        this.handleDelete({ id });
      },
    });
    // containerElementの中身をtodoListElementで上書きする
    render(todoListElement, containerElement);
    // アイテム数の表示を更新
    todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
  }

  /**
   * アプリとDOMの紐づけを登録する関数
   */
  mount() {
    this.todoListModel.onChange(this.handelChange);
    this.formElement.addEventListener("submit", this.handleEvent);
  }

  /**
   * アプリとDOMの紐づけを解除する関数
   */
  unmount() {
    this.todoListModel.offChange(this.handelChange);
    this.formElement.removeEventListener("submit", this.handleEvent);
  }
}
