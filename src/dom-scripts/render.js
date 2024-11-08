import * as url from "../images/plus.png"
import { Project } from "../logic-scripts/project";

const mainContainer = document.querySelector("#main-container");
let projectsArray = null;

export function setProjectsArray(array) {
    projectsArray = array;
}

export function renderProjectCards() {
    mainContainer.innerHTML = "";

    const newListItem = document.createElement("button");
    newListItem.innerText = "Add new To-Do";
    newListItem.addEventListener("click", () => {
        renderCreateNewItem();
    });
    mainContainer.appendChild(newListItem);

    const projectsContainer = document.createElement("div");
    projectsContainer.id = "projects-container";
    projectsContainer.classList.add("projects-container");

    for (let project of projectsArray) {
        const projectCard = getProjectCard(project)
        projectsContainer.appendChild(projectCard);
    }

    const addProjectDiv = document.createElement("div");
    addProjectDiv.classList.add("card");
    addProjectDiv.classList.add("add");
    const img = document.createElement("img");
    img.src = url.default;
    addProjectDiv.addEventListener("click", () => {
        renderCreateOrEditProject();
    })

    addProjectDiv.appendChild(img);
    projectsContainer.appendChild(addProjectDiv);

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
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", (e) => {
        e.stopPropagation();
        renderCreateOrEditProject(project);
    });

    projectCard.appendChild(nameElement);
    projectCard.appendChild(numberOfItems);
    projectCard.appendChild(numberOfCompletedItems);
    projectCard.appendChild(numberOfPendingItems);
    projectCard.appendChild(editButton);

    projectCard.addEventListener("click", (e) => {
        e.stopPropagation();
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

    const newItemButton = document.createElement("button");
    newItemButton.innerText = "New Item";
    newItemButton.addEventListener("click", () => {
        renderCreateOrEditItem(project);
    });

    div.appendChild(newItemButton);

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
        renderCreateOrEditItem(project, item);
    });
    itemDiv.appendChild(editButton);

    const toggleStatusButton = document.createElement("button");
    toggleStatusButton.innerText = "Toggle status";
    toggleStatusButton.addEventListener("click", () => {
        item.setCompleted(!item.isCompleted())
        renderList(project);
    });
    itemDiv.appendChild(toggleStatusButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
        project.removeItemFromList(item);
        renderList(project);
    });
    itemDiv.appendChild(deleteButton);

    return itemDiv;
}

function renderCreateNewItem() {
    mainContainer.innerHTML = "";

    const div = document.createElement("div");
    div.classList.add("edit-container");

    const backButton = document.createElement("button");
    backButton.innerText = "Back";
    backButton.addEventListener("click", (e) => {
        e.preventDefault();
        renderProjectCards();
    });
    div.appendChild(backButton);

    const itemElement = createNewItem();

    div.appendChild(itemElement);

    mainContainer.appendChild(div);
}

function createNewItem() {
    const form = document.createElement("form");

    const projectDiv = document.createElement("div");
    projectDiv.classList.add("form-field");

    const projectLabel = document.createElement("label");

    projectLabel.setAttribute("for", "projectInput");
    projectLabel.innerText = "Project";
    projectDiv.appendChild(projectLabel);

    const projectInput = document.createElement("select");
    projectInput.id = "projectInput";
    projectInput.setAttribute("name", "project");
    for (let project of projectsArray) {
        const projectOption = document.createElement("option");
        projectOption.innerText = project.getName();
        projectOption.value = project.getName();
        projectInput.appendChild(projectOption);
    }
    projectDiv.appendChild(projectInput);

    form.appendChild(projectDiv);

    const titleDiv = getTitleELement();
    form.appendChild(titleDiv);

    const descriptionDiv = getDescriptionElement();
    form.appendChild(descriptionDiv);

    const dueDateDiv = getDueDateElement();
    form.appendChild(dueDateDiv);

    const priorityDiv = getPriorityElement();
    form.appendChild(priorityDiv);

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.innerText = "Create"
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        const project = getProjectFromName(projectInput.value);
        project.addItemToList(titleInput.value, descriptionInput.value,
            dueDateInput.value, priorityInput.value);
        renderList(project);
    });
    form.appendChild(submitButton);

    return form;
}

function getProjectFromName(name) {
    const i = projectsArray.findIndex(project => project.getName() === name);
    return projectsArray[i];
}

function renderCreateOrEditItem(project, item = null) {
    mainContainer.innerHTML = "";

    const div = document.createElement("div");
    div.classList.add("edit-container");

    const backButton = document.createElement("button");
    backButton.innerText = "Back";
    backButton.addEventListener("click", (e) => {
        e.preventDefault();
        renderList(project);
    });
    div.appendChild(backButton);

    const itemElement = item === null ?
        createOrEditItem(project) : createOrEditItem(project, item);
    div.appendChild(itemElement);

    mainContainer.appendChild(div);
}

function createOrEditItem(project, item = null) {
    const isItemBeingEdited = item !== null ? true : false;

    const form = document.createElement("form");

    const titleDiv = isItemBeingEdited ?
        getTitleELement(item) : getTitleELement();
    form.appendChild(titleDiv);

    const descriptionDiv = isItemBeingEdited ?
        getDescriptionElement(item) : getTitleELement();
    form.appendChild(descriptionDiv);

    const dueDateDiv = isItemBeingEdited ?
        getDueDateElement(teim) : getDueDateElement();
    form.appendChild(dueDateDiv);

    const priorityDiv = isItemBeingEdited ?
        getPriorityElement(item) : getPriorityElement();
    form.appendChild(priorityDiv);

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.innerText = `${isItemBeingEdited ? "Edit" : "Create"}`;
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (isItemBeingEdited) {
            item.setTitle(titleInput.value);
            item.setDescription(descriptionInput.value);
            item.setPriority(priorityInput.value);
            item.setDueDate(dueDateInput.value);
        } else {
            project.addItemToList(titleInput.value, descriptionInput.value,
                dueDateInput.value, priorityInput.value);
        }
        renderList(project);
    });
    form.appendChild(submitButton);

    return form;
}

function renderCreateOrEditProject(project = null) {
    mainContainer.innerHTML = "";

    const div = document.createElement("div");
    div.classList.add("edit-container");

    const backButton = document.createElement("button");
    backButton.innerText = "Back";
    backButton.addEventListener("click", () => {
        renderProjectCards();
    });
    div.appendChild(backButton);

    const projectElement = project === null ?
        createOrEditProject() : createOrEditProject(project)
    div.appendChild(projectElement);

    mainContainer.appendChild(div);
}

function createOrEditProject(project = null) {
    const isProjectBeingEdited = project !== null ? true : false;

    const form = document.createElement("form");
    form.setAttribute("action", "#");

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("form-field");

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "nameInput");
    nameLabel.innerText = "Name";
    nameDiv.appendChild(nameLabel);

    const nameInput = document.createElement("input");
    nameInput.id = "nameInput";
    nameInput.setAttribute("name", "name");
    nameInput.required = true;
    if (isProjectBeingEdited) nameInput.value = project.getName();
    nameDiv.appendChild(nameInput);

    form.appendChild(nameDiv);

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.innerText = `${isProjectBeingEdited ? "Edit" : "Create"}`;
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (isProjectBeingEdited) {
            project.setName(nameInput.value);
        } else {
            projectsArray.push(new Project(nameInput.value));
        }
        renderProjectCards();
    });
    form.appendChild(submitButton);

    return form;
}

function getTitleELement(item = null) {
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("form-field");

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "titleInput");
    titleLabel.innerText = "Title";
    titleDiv.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleInput.id = "titleInput";
    titleInput.setAttribute("name", "title");
    if (item !== null) titleInput.value = item.getTitle();
    titleDiv.appendChild(titleInput);

    return titleDiv;
}

function getDescriptionElement(item = null) {
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("form-field");

    const descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "descriptionInput");
    descriptionLabel.innerText = "Description";
    descriptionDiv.appendChild(descriptionLabel);

    const descriptionInput = document.createElement("input");
    descriptionInput.id = "descriptionInput";
    descriptionInput.setAttribute("name", "description");
    if (item !== null) descriptionInput.value = item.getDescription();
    descriptionDiv.appendChild(descriptionInput);

    return descriptionDiv;
}

function getDueDateElement(item = null) {
    const dueDateDiv = document.createElement("div");
    dueDateDiv.classList.add("form-field");

    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", "dueDateInput");
    dueDateLabel.innerText = "Due Date";
    dueDateDiv.appendChild(dueDateLabel);

    const dueDateInput = document.createElement("input");
    dueDateInput.id = "dueDateInput";
    dueDateInput.setAttribute("name", "dueDate");
    if (item !== null) dueDateInput.value = item.getDueDate();
    dueDateDiv.appendChild(dueDateInput);

    return dueDateDiv;
}

function getPriorityElement(item = null) {
    const priorityDiv = document.createElement("div");
    priorityDiv.classList.add("form-field");

    const priorityLabel = document.createElement("label");
    priorityLabel.setAttribute("for", "priorityInput");
    priorityLabel.innerText = "Priority";
    priorityDiv.appendChild(priorityLabel);

    const priorityInput = document.createElement("select");
    priorityInput.id = "priorityInput";
    priorityInput.setAttribute("name", "priority");

    const low = document.createElement("option");
    low.value = "low";
    low.innerText = "Low";
    priorityInput.appendChild(low);

    const medium = document.createElement("option");
    medium.value = "medium";
    medium.innerText = "Medium";
    priorityInput.appendChild(medium);

    const high = document.createElement("option");
    high.value = "high";
    high.innerText = "High";
    priorityInput.appendChild(high);

    const critical = document.createElement("option");
    critical.value = "critical";
    critical.innerText = "Critical";
    priorityInput.appendChild(critical);

    if (item !== null) {
        switch (item.getPriority()) {
            case "Low":
                low.selected = true;
                break;
            case "Medium":
                medium.selected = true;
                break;
            case "High":
                high.selected = true;
                break;
            case "Critical":
                critical.selected = true;
                break;
        }
    }

    priorityDiv.appendChild(priorityInput);

    return priorityDiv;
}