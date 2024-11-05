import { Item } from "./item";

export class Project {
    #name;
    #list = [];
    constructor(name) {
        this.#name = name;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getList() {
        return this.#list;
    }

    getListLength() {
        return this.#list.length;
    }

    getNumberOfCompletedItems() {
        return this.#list.filter(item => item.isCompleted()).length;
    }

    getNumberOfPendingItems() {
        return this.#list.filter(item => !item.isCompleted()).length;
    }

    addItemToList(title, description, dueDate, priority) {
        this.#list.push(new Item(title, description, dueDate, priority));
    }


}