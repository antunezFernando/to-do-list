import "./index.css"
import { Project } from "./logic-scripts/project"
import { renderProjectCards, setProjectsArray } from "./dom-scripts/render"

const projects = [];

const def = new Project("Default");
def.addItemToList("item1", "Lorem", "2024", "High")
def.addItemToList("item2", "Lorem", "2025", "Critical")
def.addItemToList("item3", "Lorem", "2026", "Low")
def.getList()[0].setCompleted(true);

const proj = new Project("Second");
proj.addItemToList("item1", "Lorem", "2024", "Low")
proj.addItemToList("item2", "Lorem", "2025", "Medium")
proj.addItemToList("item3", "Lorem", "2026", "High")
proj.addItemToList("item4", "Lorem", "2026", "Critical")
proj.getList()[0].setCompleted(true);
proj.getList()[2].setCompleted(true);

projects.push(def);
projects.push(proj);

setProjectsArray(projects);
renderProjectCards();