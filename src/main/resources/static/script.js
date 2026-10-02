document.addEventListener("DOMContentLoaded", initApp);

import { addPerson, fetchPersonList, deletePersonFromDatabase } from "./scriptAPI.js";

const table = document.querySelector(".person-list");
const activityText = document.querySelector(".activity-text");

async function initApp() {
    document.querySelector(".popup-add-form").addEventListener("submit", handleAddPersonFormSubmit)
    table.addEventListener("click", handleTableClick);

    const personList = await fetchPersonList();
    displayPersonList(personList);
}

function displayPersonList(personList) {
    table.innerHTML = "";
    personList.forEach(person => {
        renderPersonInformation(person)
    })
}

function renderPersonInformation(person) {
    const row = document.createElement("tr");
    row.setAttribute("data-id", person.id);
    row.innerHTML = `
        <td>${person.firstName}</td>
        <td>${person.lastName}</td>
        <td>${person.age}</td>
        <td>${person.birthday}</td>
        <td>${person.gender}</td>
        <td>
            <button data-action="edit">Edit</button>
            <button data-action="delete">Delete</button>
        </td>
    `;
    table.appendChild(row);
}

async function handleTableClick(event) {
    const action = event.target.getAttribute("data-action");
    const row = event.target.closest("tr");
    const id = row.getAttribute("data-id");
    if (action === "delete") {
        const confirmed = confirm("Are you sure you want to remove this person")

        if (!confirmed) {
            return;
        }

        const success = await deletePersonFromDatabase(id);
        if (success) {
            row.remove();
        }
    } else if (action === "edit") {
        console.log("edit clicked");
    }
}

async function handleAddPersonFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const birthday = formData.get("date");
    const gender = formData.get("gender");
    const registrationNumber = formData.get("registration-number");
    const personData = {firstName, lastName, birthday, gender, registrationNumber}

    try {
        const newPerson = await addPerson(personData);

        renderPersonInformation(newPerson);
        event.target.reset();

        activityTextMessage(`${firstName} ${lastName} added to database`)
    } catch (e) {
        activityTextMessage(e.message)
    }
}

function activityTextMessage(message) {
    activityText.textContent = message;
    setTimeout(() => {
        activityText.textContent = "";
    }, 5000);
}