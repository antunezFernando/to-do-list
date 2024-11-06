const mainContainer = document.querySelector("#main-container");
let projectsArray = null;

export function setProjectsArray(array) {
    projectsArray = array;
}

export function renderProjectCards() {
    mainContainer.innerHTML = "";

    const projectsContainer = document.createElement("div");
    projectsContainer.id = "projects-container";
    projectsContainer.classList.add("projects-container");

    for (let project of projectsArray) {
        const projectCard = getProjectCard(project)
        projectsContainer.appendChild(projectCard);
    }

    mainContainer.appendChild(projectsContainer);
}

function getProjectCard(project) {
    const projectCard = document.createElement("div");

    const projectName = project.getName();
    projectCard.id = projectName;
    projectCard.classList.add("card");
    const nameElement = document.createElement("p");
    nameElement.innerText = `Name: ${projectName}`;
    const numberOfItems = document.createElement("p");
    numberOfItems.innerText = `N° of items: ${project.getListLength()}`;
    const numberOfCompletedItems = document.createElement("p");
    numberOfCompletedItems.innerText = `N° of completed items: ${project.getNumberOfCompletedItems()}`;
    const numberOfPendingItems = document.createElement("p");
    numberOfPendingItems.innerText = `N° of pending items: ${project.getNumberOfPendingItems()}`;

    projectCard.appendChild(nameElement);
    projectCard.appendChild(numberOfItems);
    projectCard.appendChild(numberOfCompletedItems);
    projectCard.appendChild(numberOfPendingItems);

    projectCard.addEventListener("click", () => {
        renderList(project);
    })

    return projectCard;
}

function renderList(project) {
    mainContainer.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("list-container");
    div.id = `${project.getName()}-list`;

    const backButton = document.createElement("button");
    backButton.innerText = "Back";
    backButton.addEventListener("click", () => {
        renderProjectCards();
    });

    div.appendChild(backButton);

    for (let item of project.getList()) {
        const itemDiv = getListItem(item, project);

        div.appendChild(itemDiv);
    }

    mainContainer.appendChild(div);
}

function getListItem(item, project) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("list-item");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("item-field");

    const title = document.createElement("p");
    title.innerText = `Title: ${item.getTitle()}`;
    titleDiv.appendChild(title);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("item-field");

    const description = document.createElement("p");
    description.innerText = `Description: ${item.getDescription()}`;
    descriptionDiv.appendChild(description);

    const dueDateDiv = document.createElement("div");
    dueDateDiv.classList.add("item-field");

    const dueDate = document.createElement("p");
    dueDate.innerText = `Due Date: ${item.getDueDate()}`;
    dueDateDiv.appendChild(dueDate);

    const priorityDiv = document.createElement("div");
    priorityDiv.classList.add("item-field");

    const priority = document.createElement("p");
    priority.innerText = `Priority: ${item.getPriority()}`;
    priorityDiv.appendChild(priority);

    const statusDiv = document.createElement("div");
    statusDiv.classList.add("item-field");

    const status = document.createElement("p");
    status.innerText =
        `Status: ${item.isCompleted() ? "Completed" : "Pending"}`;
    statusDiv.appendChild(status);

    itemDiv.appendChild(titleDiv);
    itemDiv.appendChild(descriptionDiv);
    itemDiv.appendChild(dueDateDiv);
    itemDiv.appendChild(priorityDiv);
    itemDiv.appendChild(statusDiv);

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", () => {
        renderEditItem(project, item);
    });
    itemDiv.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
        project.removeItemFromList(item);
        renderList(project);
    });
    itemDiv.appendChild(deleteButton);

    return itemDiv;
}

function renderEditItem(project, item) {
    mainContainer.innerHTML = "";

    const editDiv = document.createElement("div");
    editDiv.classList.add("edit-container");
    editDiv.appendChild(getItemFormElement(project, item));

    mainContainer.appendChild(editDiv);
}

function getItemFormElement(project, item = null) {
    const flag = item !== null ? true : false;

    const form = document.createElement("form");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("item-field");

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "titleInput");
    titleLabel.innerText = "Title";
    titleDiv.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleInput.id = "titleInput";
    titleInput.setAttribute("name", "title");
    if (flag) titleInput.value = item.getTitle();
    titleDiv.appendChild(titleInput);

    form.appendChild(titleDiv);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("item-field");

    const descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "descriptionInput");
    descriptionLabel.innerText = "Description";
    descriptionDiv.appendChild(descriptionLabel);

    const descriptionInput = document.createElement("input");
    descriptionInput.id = "descriptionInput";
    descriptionInput.setAttribute("name", "description");
    if (flag) descriptionInput.value = item.getDescription();
    descriptionDiv.appendChild(descriptionInput);

    form.appendChild(descriptionDiv);

    const dueDateDiv = document.createElement("div");
    dueDateDiv.classList.add("item-field");

    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", "dueDateInput");
    dueDateLabel.innerText = "Due Date";
    dueDateDiv.appendChild(dueDateLabel);

    const dueDateInput = document.createElement("input");
    dueDateInput.id = "dueDateInput";
    dueDateInput.setAttribute("name", "dueDate");
    if (flag) dueDateInput.value = item.getDueDate();
    dueDateDiv.appendChild(dueDateInput);

    form.appendChild(dueDateDiv);

    const priorityDiv = document.createElement("div");
    priorityDiv.classList.add("item-field");

    const priorityLabel = document.createElement("label");
    priorityLabel.setAttribute("for", "priorityInput");
    priorityLabel.innerText = "Priority";
    priorityDiv.appendChild(priorityLabel);

    const priorityInput = document.createElement("input");
    priorityInput.id = "priorityInput";
    priorityInput.setAttribute("name", "priority");
    if (flag) priorityInput.value = item.getPriority();
    priorityDiv.appendChild(priorityInput);

    form.appendChild(priorityDiv);

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.innerText = `${flag ? "Edit" : "Create"}`;
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        item.setTitle(titleInput.value);
        item.setDescription(descriptionInput.value);
        item.setPriority(priorityInput.value);
        item.setDueDate(dueDateInput.value);
        renderList(project);
    });
    form.appendChild(submitButton);

    return form;
}