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

    for(let item of project.getList()) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item-list")
        const itemTitle = document.createElement("p");
        itemTitle.innerText = item.getTitle();

        itemDiv.appendChild(itemTitle);

        div.appendChild(itemDiv);
    }

    mainContainer.appendChild(div);
}