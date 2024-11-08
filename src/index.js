import "./index.css"
import { Project } from "./logic-scripts/project"
import { renderProjectCards, setProjectsArray } from "./dom-scripts/render"

/* const proj = new Project("Name")
proj.addItemToList("asd", "asd", "2024-11-11", "Low")

const proj2 = new Project("Name2")
proj.addItemToList("asd2", "asd2", "2024-11-11", "Low")

const projects = [proj.getObject(), proj2.getObject()];
const json = JSON.stringify(projects)
 */

if(localStorage.getItem("projects") === null) {
    const initialProjects = [];
    const initialProjectObject = {
        name: "Initial Project",
        list: []
    }
    initialProjects.push(initialProjectObject);
    localStorage.setItem("projects", JSON.stringify(initialProjects));
}
console.log(localStorage.getItem("projects"))

setProjectsArray(JSON.parse(localStorage.getItem("projects")));
renderProjectCards();