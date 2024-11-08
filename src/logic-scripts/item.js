export class Item {
    #title;
    #description;
    #dueDate;
    #priority;
    #completed = false;

    constructor(title, description, dueDate, priority, completed) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#completed = completed;
    }

    getTitle() {
        return this.#title
    }

    setTitle(title) {
        this.#title = title;
    }

    getDescription() {
        return this.#description;
    }

    setDescription(description) {
        this.#description = description;
    }

    getDueDate() {
        return this.#dueDate;
    }

    setDueDate(dueDate) {
        this.#dueDate = dueDate;
    }

    getPriority() {
        return this.#priority;
    }

    setPriority(priority) {
        this.#priority = priority;
    }

    isCompleted() {
        return this.#completed
    }

    setCompleted(completed) {
        this.#completed = completed;
    }

    getObject() {
        return {
            title: this.getTitle(),
            description: this.getDescription(),
            dueDate: this.getDueDate(),
            priority: this.getPriority(),
            completed: this.isCompleted()
        }
    }
}