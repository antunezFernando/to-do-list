const PRIORITY = {
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    CRITICAL: "Critical"
}

export class Item {
    #title;
    #description;
    #dueDate;
    #priority;
    #completed = false;

    constructor(title, description, dueDate, priority) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
    }

    getTitle() {
        return this.#title
    }

    getDescription() {
        return this.#description;
    }

    getDueDate() {
        return this.#dueDate;
    }

    getPriority() {
        return this.#priority;
    }

    isCompleted() {
        return this.#completed
    }

    setCompleted(completed) {
        this.#completed = completed;
    }
}